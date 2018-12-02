import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { Router } from '@angular/router';


export interface Country {
  value: string;
  viewValue: string;
}
export interface Uni {
  value: string;
  viewValue: string;
}
export interface Major {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class SearchComponent implements OnInit {
  countries: Country[] = [
    { value: 'NA', viewValue: '--' },
    { value: 'germany', viewValue: 'Germany' },
    { value: 'spain', viewValue: 'Spain' },
    { value: 'austria', viewValue: 'Austria' }
  ];
  unis: Uni[] = [
    { value: 'NA', viewValue: '--' },
    { value: 'tum', viewValue: 'TUM' },
    { value: 'ulm', viewValue: 'ULM' },
    { value: 'munchen', viewValue: 'Munchen' }
  ];
  majors: Major[] = [
    { value: 'NA', viewValue: '--' },
    { value: 'dmet', viewValue: 'DMET' },
    { value: 'computerscience', viewValue: 'Computer Science' },
    { value: 'mechatronics', viewValue: 'Mechatronics' }
  ];
  users: [];
  l: number;
  names: string[];
  tags: string[];
  currPage: number;
  numberPerPage = 10;
  totPages: number;
  filter: string[];
  i: number;

  constructor(private searchService: SearchService, private router: Router) { }



  firstPage(): void {
    const self = this;
    self.currPage = 1;
    self.users = [];
  }
  search() {
    this.currPage = 1;
    this.getCurrPage();

  }
  showFilter(option: string, index: any) {
    for (this.i = 0; this.i < this.filter.length; this.i++) {
      if (this.i !== index) {
        this.filter[this.i] = 'NA';
      }
    }
    this.filter[index] = option;
  }
  // navigating to profile clicked on
  goToProfile(_id: string) {
    this.router.navigateByUrl('bprofile/' + _id);
  }
  removeTags(): void {
    this.filter = [];
    this.tags = ['NA', 'NA', 'NA'];
  }
  // calculate the number of pages to display in pagination
  getPaginationRange(): any {

    const pageNumbers = [];
    let counter = 1;

    if (this.currPage < 3) {
      // we are in page 1 or 2
      while (counter < 6 && counter <= this.totPages) {
        pageNumbers.push(counter);
        counter += 1;
      }
    } else {
      // we are in a page greater than 2
      pageNumbers.push(this.currPage - 2);
      pageNumbers.push(this.currPage - 1);
      pageNumbers.push(this.currPage);
      if (this.currPage + 1 <= this.totPages) {
        pageNumbers.push(this.currPage + 1);
      }
      if (this.currPage + 2 <= this.totPages) {
        pageNumbers.push(this.currPage + 2);
      }
    }
    return pageNumbers;
  }
  // getting the current page
  getCurrPage(): void {
    const self = this;

    console.log(self.tags);
    this.searchService.getUsers(self.tags, self.currPage, self.numberPerPage
    ).subscribe(function (retreivedUsers) {
      // self.users = retreivedUsers,
      self.users = retreivedUsers.data;
      self.totPages = retreivedUsers.data.pages;
      if (self.users.length == 0)
        console.log('No users found');
      else {
        //console.log(self.users[0].name);
        console.log(self.users.length);
      }
    });
    //this.removeTags();
  }
  changePage(pageNumber: number): void {

    this.currPage = pageNumber;
    this.getCurrPage();
    window.scrollTo(0, 0);
  }
  // initializing all the parameters to starter values
  ngOnInit() {
    window.scrollTo(0, 0);
    this.currPage = 1;
    this.tags = ['NA', 'NA', 'NA'];
    // this.getCurrPage();
    this.filter = [];
    this.currPage = 1;
    this.firstPage();
    this.search();


  }

}

