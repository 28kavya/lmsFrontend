import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings {

  siteName="LearnHub LMS";

  email="admin@learnhub.com";

  phone="+91 9876543210";

  save(){
    alert("Settings Saved Successfully");
  }

}