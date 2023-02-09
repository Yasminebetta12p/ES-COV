import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PublicationserviceService } from '../publicationservice.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { EncryptionServiceService } from '../encryption-service.service';

@Component({
  selector: 'app-addcov',
  templateUrl: './addcov.component.html',
  styleUrls: ['./addcov.component.css']
})
export class AddcovComponent implements OnInit {
  step = 0;
  date2: any;
  data: any;
  selectedItems: string[] = [];
  selectedItems2: string[] = [];
  public userId: any;
  public email: any;
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
  from: string = "";
  to: string = "";
  add = new FormGroup({
    username: new FormControl('', Validators.required),
    contact: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
  },
  )
  add2 = new FormGroup({
    from: new FormControl(this.from, Validators.required,),
    to: new FormControl(this.to, Validators.required,),
  },
  )
  add3 = new FormGroup({
    date: new FormControl('', [Validators.required]),
    nbplace: new FormControl('', [Validators.required, Validators.min(0), Validators.max(7)]),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
  },
  )
  constructor(private encryptionService: EncryptionServiceService, private route: ActivatedRoute, private router: Router, private api: PublicationserviceService, private spinner: NgxSpinnerService) { }
  date: any;
  ngOnInit(): void {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    this.add.setValue({
      username: this.data["username"],
      contact: this.data["contact"],

    });
    window.scrollTo(0, 0);
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);


    this.date = new Date().toISOString().slice(0, 16);
  }



  goBack() {
    if (this.step != 0) {
      this.step--;
    }
  }

  addData() {
    if (this.step != 2) {
      this.step++;

    } else {
      if (Array.isArray(this.add2.value.from)) {
        this.add2.value.from?.forEach((element, index) => {
          this.from = (element['item_text']);
        });
      }

      if (Array.isArray(this.add2.value.to)) {
        this.add2.value.to?.forEach((element, index) => {
          this.to = (element['item_text']);

        });
      }
      let firstdate = this.add3.value.date?.substring(0, this.add3.value.date.indexOf("T"));
      let seconddate = this.add3.value.date?.substring(this.add3.value.date.indexOf("T") + 1, this.add3.value.date.length);

      this.api.Add({ "from": this.from, "to": this.to, "prix": this.add3.value.price, "description": this.add3.value.description, "heure": seconddate, "date": firstdate, "email": this.email,"username":this.add.value.username,"contact":this.add.value.contact }).subscribe((res: any) => {
        console.log("res");
        console.log(res);
        if (res.status = 200) {
          Swal.fire(
            'Excellent!',
            'Vous avez bien ajouté votre covoiturage!',
            'success'
          ),
            this.router.navigate(['/home']);

        }


      },
        err => {
          Swal.fire(
            'Vous avez dépassé la limite !',
            err["error"]["message"],
            'error'
          ),
            console.log(err["error"]["message"]);

        })





    }
  }
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }

  dateValidator(event: any) {

    if (event.target.value) {
      const date = moment(event.target.value);
      const today = moment();
      console.log(date);

      if (date.isBefore(today)) {
        console.log("hhhh");
        this.add3.controls["date"].setErrors({ ...this.add3.controls["date"].errors, 'invalidDate': true });

      }
      else {
        this.add3.controls["date"].setErrors({ ...this.add3.controls["date"].errors, 'invalidDate': false });
        this.add3.controls["date"].setErrors(null);

      }

    }
    return { 'invalidDate': true }
  }


}
