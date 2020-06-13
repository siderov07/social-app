import { ITheme } from './theme.interface';

export const lightTheme: ITheme = {
  name: 'light',
  properties: {
    '--background-light': 'rgb(245, 245, 245)',
    '--background-default': 'rgb(255,255,255)',
    '--background-secondary': 'rgb(245,245,245)',
    '--background-default-transperant': 'rgba(200, 200, 200, 0.5)',

    '--primary-default': 'rgb(0,200,255)',
    '--primary-dark': 'rgb(0, 129, 165)',
    '--primary-light': 'rgb(102,222,255)',

    '--font-color-primary': 'rgb(100, 100, 100)', // has to be dark displayed on light fields/backgrounds
    '--font-color-secondary': 'rgb(235, 235, 235)', // has to be light displayed on darkder fields/backgrounds
    '--font-color-default': 'rgb(100, 100, 100)', // default dark font

    '--error-default': '#EF3E36',
    '--error-dark': '#800600',
    '--error-light': '#FFCECC',

    '--success-light': '#73f273',
    '--success-default': '#009900',
    '--success-dark': '#00b300',

    '--disclaimer-default': 'rgb(252, 238, 196)',

    '--background-tertiary-shadow': '0px 0px 3px 1px rgba(136, 136, 136, 0.3)',
  },
};

export const darkTheme: ITheme = {
  name: 'dark',
  properties: {
    '--background-light': 'rgb(135, 135, 135)',
    '--background-default': 'rgb(121, 121, 121)',
    '--background-secondary': 'rgb(100,100,100)',
    '--background-default-transperant': 'rgba(121, 121, 121, 0.5)',

    '--font-color-primary': 'rgb(235, 235, 235)', // has to be dark displayed on light fields/backgrounds
    '--font-color-secondary': 'rgb(50, 50, 50)', // has to be light displayed on darkder fields/backgrounds
    '--font-color-default': 'rgb(100, 100, 100)', // default dark font

    '--primary-default': 'rgb(235, 153, 0)',
    '--primary-dark': 'rgb(204, 122, 0)',
    '--primary-light': 'rgb(235, 113, 100)',

    '--error-default': '#EF3E36',
    '--error-dark': '#800600',
    '--error-light': '#FFCECC',

    '--success-light': '#73f273',
    '--success-default': '#009900',
    '--success-dark': '#00b300',

    '--disclaimer-default': 'rgb(252, 238, 196)',

    '--background-tertiary-shadow': '0px 0px 3px 1px rgba(0, 0, 0, 0.2)',
  },
};
