import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MSelect from '@mui/material/Select';

import { v4 as uuid } from 'uuid';

type OptionValue = string | number;

export interface SelectItem<V extends OptionValue> {
    label: string
    value: V
}

export interface SelectProps<V extends OptionValue> {
    items?: SelectItem<V>[]
    label?: string
    onChange: (value: V) => void
    value?: V
}

const Select = <V extends OptionValue>(props: SelectProps<V>) => {
    let labelId = props.label == null ? undefined : uuid();

    return (
        <FormControl fullWidth variant="outlined" size="small">
            {props.label ?
                (
                    <InputLabel id={labelId}>{props.label}</InputLabel>
                ) :
                null}
            <MSelect
                labelId={labelId}
                value={props.value ?? ''}
                label={props.label}
                onChange={(e) => props.onChange(e.target.value as V)}
            >
                {props.items?.map((item) => {
                    return (
                        <MenuItem key={`${item.value}`} value={item.value}>{item.label}</MenuItem>
                    );
                })}
            </MSelect>
        </FormControl>
    );
};

export default Select;
