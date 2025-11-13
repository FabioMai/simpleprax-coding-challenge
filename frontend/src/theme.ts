import { createTheme, type MantineColorsTuple } from "@mantine/core";

const primary: MantineColorsTuple = [
  "#ebecff",
  "#d3d4ff",
  "#a3a5f8",
  "#6366f1",
  "#474aed",
  "#2d2feb",
  "#1d22eb",
  "#1016d1",
  "#0713bc",
  "#000ea6",
];

export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary,
  },
});
