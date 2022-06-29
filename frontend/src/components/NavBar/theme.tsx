import { SimpleGrid as SimpleGridUI } from '@chakra-ui/react';
import styled from "styled-components";


export const LightSimpleGrid = {
    zIndex: "5",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    background: "teal",
    color: "white",
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
    color: "teal",
    padding: "4px",
    gridTemplateColumns: "0.5fr 1fr",
    alignItems: "center",
}

export const DarkDrawerContent = {
    background: "#121212",
    color: "teal",
}

export const LightDrawerContent = {
    background: "teal",
    color: "white",
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