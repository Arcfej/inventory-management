import React, { useState } from "react";
import { Box, Button, Form, FormField, TextArea } from "grommet";
import { modifyQuantity, removeProduct } from "../store/inventoryReducer";
import { useDispatch } from "react-redux";

const ProductActions = ({ name, quantity }) => {
    const dispatch = useDispatch();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ newQuantity, setNewQuantity ] = useState(quantity);

    return (
        <Box direction="row" gap="small" justify="end">
            <Form
                onSubmit={() => {
                    setIsEditing(false);
                    dispatch(modifyQuantity({ name, quantity: newQuantity }));
                }}
                validate="change"
            >
                <Box direction="row" gap="small" fill="false" align="center">
                    {isEditing &&
                        <FormField label="New Quantity"
                                   name="newQuantity"
                                   // validate={{ regexp: /^[0-9]+$/, message: "Quantity must be a number" }}
                        >
                            <TextArea onChange={(event) => setNewQuantity(event.target.value)}/>
                        </FormField>
                    }
                    <Button label={isEditing ? "Cancel" : "Modify"} onClick={() => {setIsEditing(!isEditing)}}/>
                    {isEditing && <Button label="Save" type="submit"/>}
                    <Button label="Remove" onClick={() => {
                        dispatch(removeProduct(name))
                    }}/>
                </Box>
            </Form>
        </Box>
    );
};

export default ProductActions;
