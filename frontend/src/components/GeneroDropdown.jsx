import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { generos } from "../utils/opcoes_form";

export default function GeneroDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 text-sm">
            <span className="block truncate">
              {value ? generos.find((g) => g.value === value)?.label : "Selecione seu gênero"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {generos
              .filter((g) => !g.disabled)
              .map((g) => (
                <ListboxOption
                  key={g.value}
                  value={g.value}
                  className={({ focus }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      focus ? "bg-green-100 text-green-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {g.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}

GeneroDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};