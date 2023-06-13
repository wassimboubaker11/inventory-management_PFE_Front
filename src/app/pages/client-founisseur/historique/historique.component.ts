import { Component, OnInit } from '@angular/core';
import { MvtService } from 'src/app/core/services/mvt.service';
import { DatePipe } from '@angular/common';
import { NgSelectComponent } from '@ng-select/ng-select';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
  providers: [DatePipe]
})
export class HistoriqueComponent implements OnInit {
  Mvt:any
  searchQuery: string = '';
  selectValue = ['ENTRANT', 'SORTANT'];
  selectedType: string = '';

  

  breadCrumbItems: Array<{}>;
  constructor(private mvtservice:MvtService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Historique', active: true }];
    this.getAllMVT();

    
  }
  onTypeSelectionChange() {
    if (!this.selectedType) {
      this.selectedType = ''; // Set it to an empty string
      this.getAllMVT(); // Fetch all MVT items again
    }
  }

  searchCommande() {
    if (this.searchQuery) {
      this.Mvt = this.Mvt.filter((mvt) => {
        const articleNameMatch = mvt.articleDTO.nom?.toLowerCase().includes(this.searchQuery.toLowerCase());
        const dateMatch = this.datePipe.transform(mvt.commandeDTO.date, 'yyyy-MM-dd').includes(this.searchQuery);
  
        return articleNameMatch || dateMatch;
      });
    } else {
      this.ngOnInit();
    }
  }

  getAllMVT(){
      this.mvtservice.getAllMVT().subscribe(
        response=>{
            this.Mvt=response
            console.log(response)
        },
        err=>{
          console.log(err)
        }
      )
  }

}
