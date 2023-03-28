import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { HStack, Button, TextInput, Switch, ListItem } from "@react-native-material/core";
import styled from 'styled-components/native';

const FormFields = ({ action, onSubmit, submitButtonLabel, paramData }) => {

    const [id, setId] = useState(action === 'submit' ? false : paramData._id);
    const [checked, setChecked] = useState(action === 'submit' ? false : paramData.had_supervision);
    const [textType, onChangeType] = useState(action === 'submit' ? "" : paramData.type);
    const [textFarmName, onChangeFarmName] = useState(action === 'submit' ? "" : paramData.farmer.name);
    const [textFarmCity, onChangeFarmCity] = useState(action === 'submit' ? "" : paramData.farmer.city);
    const [textFarmOwnerName, onChangeFarmOwnerName] = useState(action === 'submit' ? "" : paramData.from.name);
    const [textFarmMilk, onChangeFarmMilk] = useState(action === 'submit' ? 0 : paramData.amount_of_milk_produced.toString());
    const [textFarmCows, onChangeFarmCows] = useState(action === 'submit' ? 0 : paramData.number_of_cows_head.toString());
    const [textFarmManegerName, onChangeFarmManegerName] = useState(action === 'submit' ? "" : paramData.to.name);

    const handleSubmit = () => {

        const modelCreateCheckListRealmObject = {
            "type": textType,
            "amount_of_milk_produced": textFarmMilk,
            "number_of_cows_head": textFarmCows,
            "had_supervision": checked,
            "farmer": {
                "name": textFarmName,
                "city": textFarmCity
            },
            "from": {
                "name": textFarmOwnerName
            },
            "to": {
                "name": textFarmManegerName
            },
            "location": {
                "latitude": Math.random() * ((-27) - (-22) + 1) + (-22), // fake
                "longitude": Math.random() * ((-47) - (-42) + 1) + (-42) // fake
            },
            "created_at": new Date(),
            "updated_at": new Date(),
            "__v": 1
        };

        const allFieldsAreFilled = (
            textType !== '' &&
            textFarmName !== '' &&
            textFarmCity !== '' &&
            textFarmOwnerName !== '' &&
            textFarmMilk > 0 &&
            textFarmCows > 0
        );
        if (allFieldsAreFilled) {
            onSubmit(modelCreateCheckListRealmObject);
        }
        else {
            Alert.alert('Atenção', 'Todos os campos são obrigatórios.', [
                {
                    text: 'OK'
                },
            ]);   
        }

    }

    const handleChangeType = value => {
        onChangeType(value);
    }

    const handleChangeFarmName = value => {
        onChangeFarmName(value);
    }

    const handleChangeFarmCity = value => {
        onChangeFarmCity(value);
    }

    const handlehangeFarmOwnerName = value => {
        onChangeFarmOwnerName(value);
    }

    const handleChangeFarmMilk = value => {
        onChangeFarmMilk(value.replace(/[^0-9]/g, ''));
    }

    const handleFarmCows = value => {
        onChangeFarmCows(value.replace(/[^0-9]/g, ''));
    }

    const handleChangeFarmManegerName = value => {
        onChangeFarmManegerName(value);
    }

    const KeyboardAvoidingViewComponent = styled(KeyboardAvoidingView)`
    `;

    const ScrollViewComponent = styled(ScrollView)`
    `;

    const HStackComponent = styled(HStack)`
    `;

    const TextInputComponent = styled(TextInput)`
    `;

    const SwitchComponent = styled(Switch)`
    `;

    const ButtonComponent = styled(Button)`
        margin-top: 20px;
        margin-bottom: 200px;
        margin-right: 20px;
        margin-left: 20px;
    `;

    return (
        <KeyboardAvoidingViewComponent behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
            <ScrollViewComponent>
                <TextInputComponent label="Tipo" placeholder="" onChangeText={handleChangeType} value={textType} returnKeyType="next" keyboardType="default" />
                <TextInputComponent label="Nome da Fazenda" placeholder="" onChangeText={handleChangeFarmName} value={textFarmName} returnKeyType="next" keyboardType="default" />
                <TextInputComponent label="Cidade da Fazenda" placeholder="" onChangeText={handleChangeFarmCity} value={textFarmCity} returnKeyType="next" keyboardType="default" />
                <TextInputComponent label="Nome Proprietário" placeholder="" onChangeText={handlehangeFarmOwnerName} value={textFarmOwnerName} returnKeyType="next" keyboardType="default" />
                <TextInputComponent label="Quantidade de leite produzido" placeholder="" onChangeText={handleChangeFarmMilk} value={textFarmMilk} returnKeyType="next" keyboardType="number-pad" />
                <TextInputComponent label="Número de cabeças de vaca" placeholder="" onChangeText={handleFarmCows} value={textFarmCows} returnKeyType="next" keyboardType="number-pad" />
                <ListItem
                    title="Tem supervisor?"
                    trailing={
                        <Switch value={checked} onValueChange={() => setChecked(!checked)} />
                    }
                    onPress={() => setChecked(!checked)}
                />
                {checked && <TextInputComponent label="Nome Supervisor" placeholder="" onChangeText={handleChangeFarmManegerName} value={textFarmManegerName} returnKeyType="done" keyboardType="number-pad" />}
                <ButtonComponent
                    title={submitButtonLabel}
                    onPress={handleSubmit}
                />
            </ScrollViewComponent>
        </KeyboardAvoidingViewComponent>
    )
};

export default FormFields;