import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import { SearchService } from './search.service';
import { User } from './user';
// import { PageEvent, MatPaginator } from '@angular/material';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: User[];
  tag: string;
  tags: string[];
  currPage: number;
  numberPerPage = 10;
  totPages: number;
  searchKey: string;
  major: string;
  uni: string;
  country: string;
  filter: string[];
  i: number;


  constructor(private searchService: SearchService) { }

  firstPage(): void {
    const self = this;
    self.currPage = 1;
    self.users = [];
  }
  applyCountry(input: string) {
    this.tags[0] = input;
  }
  applyUni(input: string) {
    this.tags[1] = input;
  }
  applyMajor(input: string) {
    this.tags[2] = input;
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
  goToProfile(username: string) {
    this.searchService.viewProfile(username);
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
    self.searchService.getUsers(self.tags, self.currPage, self.numberPerPage
    ).subscribe(function (retreivedUsers) {
      self.users = retreivedUsers.data.docs,
        self.totPages = retreivedUsers.data.pages;
    });
    this.removeTags();
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
    this.users = [];
   // this.getCurrPage();
    this.filter = [];
    this.currPage = 1;
    this.firstPage();

  }

}
