import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-hora-confirmada',
  templateUrl: './hora-confirmada.component.html',
  styleUrls: ['./hora-confirmada.component.scss']
})
export class HoraConfirmadaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.sendQueryParamToEndpoint();
  }

  sendQueryParamToEndpoint() {
    this.route.queryParams.subscribe(params => {
      const queryParam = params['t'];

      // Optional: Validate the query parameter or perform any necessary transformations

      const endpoint = '/api/calendar';
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const queryParams = { t: queryParam };

      this.http.post(endpoint, null, { headers, params: queryParams }).subscribe(
        response => {
          console.log('POST request success:', response);
          // Handle success or redirect to a success page
        },
        error => {
          console.error('POST request error:', error);
          // Handle error or redirect to an error page
        }
      );
    });
  }
}