import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BoxesComponent } from './components/boxes/boxes.component';
import { PasswordStatuses } from './types/PasswordStatuses';

function calculatePasswordStrength(password: string) {
  if (password.length === 0) {
    return PasswordStatuses.Empty;
  }

  if (password.length < 8) {
    return PasswordStatuses.LessThen8chars;
  }

  const hasDigits = /\d/.test(password);

  const hasLetters = password
    .split('')
    .some(ch => ch.toLowerCase() !== ch.toUpperCase());

  const hasSymbols = password
    .split('')
    .some(ch => /\D/.test(ch) && ch.toLowerCase() === ch.toUpperCase());

  switch (true) {
    case (hasLetters && hasDigits && hasSymbols):
      return PasswordStatuses.Strong;

    case (hasLetters && hasDigits) || (hasLetters && hasSymbols) || (hasDigits && hasSymbols):
      return PasswordStatuses.Medium

    default:
      return PasswordStatuses.Easy
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, BoxesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  password = '';

  get passwordStrength() {
    return calculatePasswordStrength(this.password);
  }
}
