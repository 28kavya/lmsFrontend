import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../models/Certificate';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-certificates',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificatesComponent implements OnInit {

  certificates: Certificate[] = [];

  constructor(private certificateService: CertificateService) { }

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates() {

    this.certificateService.getCertificates()
      .subscribe(data => {

        this.certificates = data;

      });

  }

  download(courseId: number) {

    this.certificateService.downloadCertificate(courseId)
      .subscribe(blob => {

        const file = new Blob([blob], {
          type: 'application/pdf'
        });

        const url = window.URL.createObjectURL(file);

        const a = document.createElement('a');

        a.href = url;

        a.download = 'LearnHub_Certificate.pdf';

        a.click();

        window.URL.revokeObjectURL(url);

      });

  }

}
