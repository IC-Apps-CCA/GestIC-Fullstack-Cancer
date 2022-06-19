import { SimpleGrid as SimpleGridUI } from '@chakra-ui/react';
import styled from "styled-components";


export const LightSimpleGrid = {
    zIndex: "5",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    background: '#192A51',
    color: "#F5E6E8",
    padding: "4px",
    gridTemplateColumns: "0.5fr 1fr",
    alignItems: "center",

}

export const DarkSimpleGrid = {
    zIndex: "5",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    background: "#121212",
    color: "#F5E6E8",
    padding: "4px",
    gridTemplateColumns: "0.5fr 1fr",
    alignItems: "center",
    borderWidth: '0 0 1px 0px',
    borderColor: '#F5E6E8'
}

export const DarkDrawerContent = {
    background: "#121212",
    color: "#F5E6E8",
}

export const LightDrawerContent = {
    background: '#192A51',
    color: "#F5E6E8",

}


export const lightTheme = {
    body: "#CCE8CC",
    text: "#8EA08E",
    toggleBorder: "#fff"
};

export const darkTheme = {
    body: "#111",
    text: "#fafafa",
    toggleBorder: "#6B8096"
};