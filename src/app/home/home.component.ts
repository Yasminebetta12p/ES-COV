import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PublicationserviceService } from '../publicationservice.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

// @ts-ignore
import Typewriter from 't-writer.js';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None


})
export class HomeComponent implements OnInit {


  from: string = " ";
  to: string = " ";
  nodata: boolean = false;
  Cov: any = [];
  data: any;

  add = new FormGroup({
    date: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
  })
  selectedItems = [{ item_id: Number, item_text: String }];
  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 3,
    enableCheckAll: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  dropdownList = [
    { item_id: 1, item_text: 'esprit' },
    { item_id: 2, item_text: 'nasser' },
    { item_id: 3, item_text: 'aouina' },
    { item_id: 4, item_text: 'sokra' },
    { item_id: 5, item_text: 'jdm2' },
    { item_id: 6, item_text: 'ghazela' },
    { item_id: 7, item_text: 'ariena' },
  ];
  constructor( private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router, private api: PublicationserviceService) { }

  ngOnInit(): void {


    window.scrollTo(0, 0);
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
    // this.loaddata() ;
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);
    const target = document.querySelector('.tw')
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: '#000000'

    })

    writer
      .type('BIENVENUE A ESCOV ')
      .rest(500)
      .changeOps({ deleteSpeed: 80 })
      .remove(20)
      .type('WELCOME TO ESCOV')
      .rest(500)
      .remove(16)
      .clear()
      .start()

  }

 
  loaddata() {
    this.api.latest().subscribe((res: any) => {

      this.Cov = res

      if (this.Cov.length == 0) {
        this.nodata = true;
      }

    })
  }
  addData() {
    if (Array.isArray(this.add.value.from)) {
      this.add.value.from?.forEach((element, index) => {
        this.from = (element['item_text']);

      });
    }

    if (Array.isArray(this.add.value.to)) {
      this.add.value.to?.forEach((element, index) => {
        this.to = (element['item_text']);

      });
    }

    this.router.navigate(['/Covoiturage/', this.from, this.to, this.add.value.date]);



  }

}
