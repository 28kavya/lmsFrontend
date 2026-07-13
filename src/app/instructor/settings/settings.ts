import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings implements OnInit {

  constructor(private router: Router) {}

  // ==========================
  // Profile Details
  // ==========================

  fullName = 'David Johnson';
  email = 'davidjohnson@gmail.com';
  phone = '+91 9876543210';
  experience = '6 Years';
  bio =
    'Passionate Java & Angular Instructor helping students build industry-ready skills.';

  language = 'English';
  timezone = 'Asia/Kolkata';
  darkMode = false;

  profileImage = 'https://i.pravatar.cc/180?img=12';

  // Password Fields

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  // ==========================
  // Load Saved Data
  // ==========================

  ngOnInit(): void {
    const savedData = localStorage.getItem('settings');

    if (savedData) {
      const profile = JSON.parse(savedData);

      this.fullName = profile.fullName ?? this.fullName;
      this.email = profile.email ?? this.email;
      this.phone = profile.phone ?? this.phone;
      this.experience = profile.experience ?? this.experience;
      this.bio = profile.bio ?? this.bio;
      this.language = profile.language ?? this.language;
      this.timezone = profile.timezone ?? this.timezone;
      this.darkMode = profile.darkMode ?? this.darkMode;
      this.profileImage = profile.profileImage ?? this.profileImage;
    }
  }

  // ==========================
  // Save Profile
  // ==========================

  saveChanges(): void {

    const profile = {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      experience: this.experience,
      bio: this.bio,
      language: this.language,
      timezone: this.timezone,
      darkMode: this.darkMode,
      profileImage: this.profileImage
    };

    localStorage.setItem('settings', JSON.stringify(profile));

    alert('✅ Profile Updated Successfully!');
  }

  // ==========================
  // Change Password
  // ==========================

  changePassword(): void {

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.newPassword.length < 6) {
      alert('Password should contain minimum 6 characters');
      return;
    }

    alert('Password Changed Successfully');

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  // ==========================
  // Upload Profile Image
  // ==========================

  onImageSelected(event: any): void {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      this.profileImage = reader.result as string;

    };

    reader.readAsDataURL(file);
  }

  // ==========================
  // Logout
  // ==========================

  logout(): void {

    if (confirm('Are you sure you want to logout?')) {

      localStorage.clear();
      sessionStorage.clear();

      this.router.navigate(['/login']);
    }
  }

}