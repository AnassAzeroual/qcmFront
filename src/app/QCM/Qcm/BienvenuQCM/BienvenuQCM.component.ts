import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { QCMService } from '../../Services/QCM.service';

@Component({
  selector: 'app-BienvenuQCM',
  templateUrl: './BienvenuQCM.component.html',
  styleUrls: ['./BienvenuQCM.component.scss']
})
export class BienvenuQCMComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute,private router:Router,private qcmService:QCMService
    ,private alertService:AlertService) {
      
     }

  ngOnInit() {
    this.route.queryParams
      .subscribe(
        (params: Params) => {
           this.id = params['id'];
           
        });


    

  }

  getQcmByIdHash(idhash:any){
    this.qcmService.getQcmByIdHash(idhash).subscribe(res =>{
      
      if(res.statut == "T"){
  
        this.alertService.info('vous avez deja passe ce quiz ,Merci')
        
      }
      else  {

        this.qcmService.changeValue(this.id);
        this.router.navigate(["/qcm/commencer-qcm"])
      }
    });
  }

  commencer(){
    this.getQcmByIdHash(this.id)
   }

   
}
