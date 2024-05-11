import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private resendApiKey = 're_N7GyvxFo_9XZxv5FyqgG4NUhAAXKY6qgH'; // Aquí coloca tu clave API de resend
  private resendUrl = 'https://api.resend.com'; // URL de la API de resend

  constructor(private http: HttpClient) { }

  sendEmail() {
    const emailData = {
      from: 'Acme <onboarding@resend.dev>',
      to: ['wcmore.93@gmail.com'],
      subject: 'hello world',
      text: 'it works!',
      headers: {
        'X-Entity-Ref-ID': '123456789',
      },
      tags: [
        {
          name: 'category',
          value: 'confirm_email',
        },
      ],
    };

    return this.http.post(`${this.resendUrl}/emails`, emailData, {
      headers: {
        'Authorization': `Bearer ${this.resendApiKey}`
        
      }

      
    });
  }
}
