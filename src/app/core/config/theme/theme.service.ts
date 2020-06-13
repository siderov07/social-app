import { Injectable } from '@angular/core';
import { ITheme } from './theme.interface';
import { darkTheme, lightTheme } from './themes';
import { LStorage } from '../constants/storage';


@Injectable()
export class ThemeService {

  constructor( ) { }
  readonly defaultTheme = lightTheme;
  private active: ITheme = lightTheme;
  private readonly availableThemes: ITheme[] = [darkTheme, lightTheme];
  private isUserLogged = false;

  getAvailableThemes(): ITheme[] {
    return this.availableThemes;
  }

  setDefaultTheme(): void{
    this.isUserLogged = false;
    this.setActiveTheme(this.defaultTheme);
  }

  getActiveTheme(): ITheme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === darkTheme.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(darkTheme);
  }

  setLightTheme(): void {
    this.setActiveTheme(lightTheme);
  }

  private setActiveTheme(theme: ITheme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });

    if (this.isUserLogged) {
      localStorage.setItem(LStorage.LastUserTheme, theme.name);
    }
  }

  initializeTheme(isUserLogged: boolean): void {

    if (isUserLogged) {
      this.isUserLogged = true;
      let lastTheme: string | ITheme = localStorage.getItem(LStorage.LastUserTheme);
      lastTheme = this.getAvailableThemes().find(theme => theme.name === lastTheme) || this.defaultTheme;
      this.setActiveTheme(lastTheme);

    }else{
      this.setDefaultTheme();
    }
  }

  toggleTheme(): void {
    if (this.isDarkTheme()) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }
}
