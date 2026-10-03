"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { RiMapPinLine } from "@remixicon/react";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { suggestAddresses, type AddressParts, type AddressSuggestion } from "@/utils/google-places";

const emptyParts: AddressParts = { formatted: "", street: "", city: "", state: "", zip: "", placeId: "" };

/**
 * Property address field with Google address suggestions. Picking a suggestion fills hidden
 * address_street / address_city / address_state / address_zip / address_place_id fields for the CRM.
 * If Google can't load, it behaves like a normal text field.
 */
export function AddressAutocomplete({ name = "address" }: { name?: string }) {
  const listId = useId();
  const [value, setValue] = useState("");
  const [parts, setParts] = useState<AddressParts>(emptyParts);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const request = useRef(0);

  useEffect(() => {
    const query = value.trim();
    if (query.length < 3 || query === parts.formatted) return;
    const id = ++request.current;
    const timer = setTimeout(() => {
      suggestAddresses(query)
        .then((results) => {
          if (id !== request.current) return;
          setSuggestions(results);
          setActive(-1);
          setOpen(results.length > 0);
        })
        .catch(() => setOpen(false));
    }, 200);
    return () => clearTimeout(timer);
  }, [value, parts.formatted]);

  async function choose(suggestion: AddressSuggestion) {
    setOpen(false);
    setValue(suggestion.text);
    try {
      const chosen = await suggestion.select();
      setParts(chosen);
      setValue(chosen.formatted);
    } catch {
      setParts({ ...emptyParts, formatted: suggestion.text });
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => (current + step + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      void choose(suggestions[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <Input
        label="Property Address"
        name={name}
        autoComplete="off"
        placeholder="Start typing your address…"
        leadingIcon={RiMapPinLine}
        isRequired
        validationBehavior="native"
        fieldClassName="offer-field"
        inputClassName="text-headline-regular"
        value={value}
        onChange={(next) => {
          setValue(next);
          if (next !== parts.formatted) setParts(emptyParts);
          if (next.trim().length < 3) setOpen(false);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-autocomplete="list"
        aria-controls={open ? listId : undefined}
        aria-expanded={open}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
      />
      <input type="hidden" name="address_street" value={parts.street} />
      <input type="hidden" name="address_city" value={parts.city} />
      <input type="hidden" name="address_state" value={parts.state} />
      <input type="hidden" name="address_zip" value={parts.zip} />
      <input type="hidden" name="address_place_id" value={parts.placeId} />
      {open && (
        <div className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-border-button-default bg-background-primary-default shadow-xl">
          <ul id={listId} role="listbox" aria-label="Address suggestions" className="flex flex-col py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => void choose(suggestion)}
                onMouseEnter={() => setActive(index)}
                className={cx("flex cursor-pointer items-center gap-2 px-3 py-2.5 text-body-regular text-text-primary", index === active && "bg-background-secondary-hover")}
              >
                <RiMapPinLine className="size-4 shrink-0 text-foreground-icon-tertiary" aria-hidden />
                <span className="truncate">{suggestion.text}</span>
              </li>
            ))}
          </ul>
          <p className="border-t border-separator-border px-3 py-1.5 text-right text-caption-1-regular text-text-tertiary">Powered by Google</p>
        </div>
      )}
    </div>
  );
}
