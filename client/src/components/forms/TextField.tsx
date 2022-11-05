import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    InputLabelProps,
    OutlinedInput,
    OutlinedInputProps,
    TextField as MTextField
} from '@mui/material';

import {
    Lock,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

import styles from './Forms.module.less';

interface TextFieldProps {
    error?: boolean
    fullWidth?: boolean
    helperText?: string,
    label?: string
    onChange: (value:string) => void
    required?: boolean
    type?: 'normal' | 'password'
    startAdornment?: React.ReactNode
    value?: string
}

export const TextField = (props: TextFieldProps) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputProps: OutlinedInputProps = {};
    const inputLabelProps: InputLabelProps = {};

    const hasValue = (props.value?.length ?? 0) > 0;

    let startAdornment = props.startAdornment;
    if (startAdornment == null && props.type === 'password') {
        startAdornment = (<Lock />);
    }

    if (startAdornment) {
        inputProps.startAdornment = (
            <InputAdornment
                position="start"
            >
                {startAdornment}
            </InputAdornment>
        );

        inputLabelProps.shrink = focused || hasValue;
        inputLabelProps.className = focused || hasValue ? undefined : styles.inputLabelNoShrink;
    }

    if (props.type === 'password') {
        const id = uuid();

        return (
            <FormControl
                className={styles.textField}
                fullWidth={props.fullWidth}
                variant="outlined"
            >
                <InputLabel
                    htmlFor={id}
                    shrink={focused || hasValue}
                    className={focused || hasValue ? undefined : styles.inputLabelNoShrink}
                >
                    {props.label}
                </InputLabel>
                <OutlinedInput
                    id={id}
                    error={props.error}
                    label={focused || hasValue ? props.label : undefined}
                    type={showPassword ? 'text' : 'password'}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    startAdornment={inputProps?.startAdornment}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {props.helperText ?
                    <FormHelperText error={props.error}>{props.helperText}</FormHelperText> :
                    null}
            </FormControl>
        );
    }

    return (
        <MTextField
            error={props.error}
            required={props.required}
            helperText={props.helperText}
            className={styles.textField}
            label={props.label}
            variant="outlined"
            fullWidth={props.fullWidth}
            value={props.value ?? ''}
            onChange={(e) => props.onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
        />
    )
};
