import { FormQuantity } from "./form-quantity/form-quantity";

import { FormDropdown } from "./form-dropdown/form-dropdown";

import { formPagination } from "./form-pagination/form-pagination";

import { formSlider } from "./form-slider/form-slider";

import { FormRate } from "./form-rate/form-rate";
import { Input } from "./input/input";

import { FormInput } from "./form-input/form-input";
import { FormRadio } from "./form-radio/form-radio";
import { FormToggle } from "./form-toggle/form-toggle";


export const form = {
    Input: Input,
    FormInput: FormInput, 
    FormDropdown: FormDropdown, 
    FormQuantity: FormQuantity,
    FormRadio: FormRadio, 
    FormToggle: FormToggle,     
    FormRate: FormRate, 

    formSlider: formSlider, 
    formPagination: formPagination
}