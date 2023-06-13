import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeService } from 'src/app/core/services/commande.service';
import { MvtService } from 'src/app/core/services/mvt.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FactureService } from 'src/app/core/services/facture.service';

import { Commande } from 'src/app/core/models/commande';
import { Facture } from 'src/app/core/models/facture';


@Component({
  selector: 'app-list-commande-fournisseur',
  templateUrl: './list-commande-fournisseur.component.html',
  styleUrls: ['./list-commande-fournisseur.component.scss']
})
export class ListCommandeFournisseurComponent implements OnInit {
  facture: Facture= new Facture();
  commandes:any
   mvts:any
  searchQuery: string = '';
commandebyid:Commande=new Commande();
articles: any[] = [];
 fournisseur:any
idcommande:any

totalArticlesTTC: number = 0;
totalArticlesTVA: number = 0;
totalArticlesHT: number = 0;


articlee:any


    // bread crumb items
    breadCrumbItems: Array<{}>;
   constructor(private modalService: NgbModal , private commandeservice:CommandeService, private mvtservice:MvtService, private factureservice:FactureService) { }
 
   ngOnInit(): void {
     this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Commandes Founisseurs', active: true }];
 
     this.getAllCommandesFournisseur();
   }

   
   searchCommande(){
    if (this.searchQuery) {
      this.commandes = this.commandes.filter((commande) => {
        return (
          commande.nom?.toLowerCase().includes(this.searchQuery.toLowerCase()) 
        );
      });
    } else {
      this.ngOnInit();
    }

  }
 /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */


 savefacture(){
  this.factureservice.savefacture(this.idcommande).subscribe(
    responce=>{
      console.log(responce)
      
      // this.commandebyid=null
       this.modalService.dismissAll();
      // this.ngOnInit();
    },
    err=>{
      console.log(err)
    }
  )
 }
 
   getAllCommandesFournisseur(){
     this.commandeservice.getAllCommandeFounisseur().subscribe(
       responce=>{
        this.commandes = responce.map(commande => {
          return {
            ...commande,
            hasFacture: commande.factureDTO !== null
          };
        });
       },
       err=>{
         console.log(err)
       }
     )
   }

   confirm(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        
          this.commandeservice.deletecommandefournisseur(id).subscribe(
              
            responce=>{
              console.log(responce)
              this.ngOnInit();
              
            },
            err=>{
              console.log(err)
            }
          )
        
        Swal.fire('Deleted!', 'company has been deleted.', 'success');
        
      }
      
    });
  }
  getcommandebyid(){
    this.commandeservice.getcommandebyid(this.idcommande).subscribe(
      responce=>{
          this.commandebyid=responce
          this.fournisseur=responce.tier
          console.log("commande we7da" , this.commandebyid)
      },
      err=>{
        console.log(err)
      }
    )
  }
  
  extraLarge(exlargeModal: any, id: any) {
    this.getfactureByIdCommande(id);
    this.modalService.open(exlargeModal, { size: 'xl' });
    this.idcommande=id
    this.getcommandebyid();

    this.totalArticlesTTC = 0;
    this.totalArticlesTVA = 0;
    this.totalArticlesHT = 0;

    this.mvtservice.getAllMVTByIdcommande(id).subscribe(
      response => {
        this.mvts = response;
        this.articles = [];
        let totalArticlesTTC: number = 0;
        let totalArticlesTVA: number = 0;
        let totalArticlesHT: number = 0;
        for (const mvt of response) {
          if (mvt.articleDTO) {
            const tva = (mvt.articleDTO.prixachat * mvt.quantity) * 0.19;
            const totalHT = mvt.articleDTO.prixachat * mvt.quantity;
            const ttc = totalHT + tva;
            const articleWithQuantity = {
              code:mvt.articleDTO.code_barre,
              name: mvt.articleDTO.nom,
              imageUrl: mvt.articleDTO.picture,
              purchasePrice: mvt.articleDTO.prixachat,
              quantity: mvt.quantity,
              tva: tva,
              totalHT: totalHT,
              ttc: ttc,
              
            };
            this.articles.push(articleWithQuantity);
            this.totalArticlesTTC += ttc;
            this.totalArticlesTVA += tva;
            this.totalArticlesHT += totalHT;
          }
        }
        console.log("articles", this.articles);
        console.log("response", response);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAllMVTByIdcommande(id:any){
    this.mvtservice.getAllMVTByIdcommande(id).subscribe(
      response => {
        this.mvts = response;
        this.articles = [];
        for (const mvt of response) {
          if (mvt.articleDTO) {
            const articleWithQuantity = {
              name: mvt.articleDTO.nom,
              imageUrl: mvt.articleDTO.picture,
              purchasePrice: mvt.articleDTO.prixachat,
              quantity: mvt.quantity
              
            };
            this.articles.push(articleWithQuantity);

            
          }
        }
        console.log("articles", this.articles);
        console.log("response", response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getfactureByIdCommande(id:any){
    this.factureservice.getfacturebyidcommande(id).subscribe(
      responce=>{
        this.facture=responce
        console.log("facture by idcommande",responce);
      },
      err=>{
        console.log(err);
      }
    )
  }

  public openPDF(): void {
    
  
    const font = environment.fontA;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.addFileToVFS('Amiri-Regular.ttf', font);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri');
    doc.setFontSize(18);
  
    autoTable(doc, {
      styles: { font: 'Amiri', fontSize: 13, halign: 'left' },
      startY: 25,
      columnStyles: {
        0: { cellWidth: 50, textColor: 0, cellPadding: 0 },
        1: { cellWidth: 65, textColor: 0, cellPadding: 0 },
      },
      body: [
        ['Facture N°:', this.facture.reference], // Display the reference in the PDF
        ['Date:', this.facture.dateFacture],
      ],
      theme: 'plain',
      tableWidth: 'wrap',
    });
    doc.addImage('assets/images/windd.jpg', 'jpg', doc.internal.pageSize.width - 120, 15, 50, 50);
    doc.line(30, 85, 560, 85); // horizontal line
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 14, halign: 'left'},
      startY: 100,
      margin: {left : 50},
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      columnStyles: {
        0: {cellWidth: 120, textColor: 0},
        1: {cellWidth: 110, textColor: 0}
      },
      head: [[{content: 'Fournisseur', colSpan: 2, styles: {halign: 'center'}}]],
      body: [
        ['Nom', this.fournisseur.nom],
        ['Adresse', this.fournisseur.address],
        ['Téléphone', this.fournisseur.tel],
        ['Email', this.fournisseur.email]
      ],
      theme: 'striped',
    });

    autoTable(doc, {
      // styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 1},
      styles: {font: 'Amiri', fontSize: 12, halign: 'right', textColor : 1},
      // headStyles: {fillColor: [128, 128, 128]},
      startY: 250,
      columnStyles: {
        0: {cellWidth: 40},
        1: {cellWidth: 80},
     
      },
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      head: [['Code ', 'Désignation ', 'Quantité ', 'P.U  ', 'TVA(19%) ', 'Total HT', 'TTC']],
      body: this.articles.map(article => [
        article.code,
        article.name,
        article.quantity,
        article.purchasePrice,
        article.tva,
        article.totalHT,
        article.ttc,
      ]),
       
      
      theme: 'striped',
      tableWidth: 'auto',

    });
    const y = (doc as any).lastAutoTable.finalY + 20;
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12, halign: 'left', overflow: 'linebreak'},
      margin: {left: 375},
      startY: y,
      columnStyles: {
        0: {cellWidth: 80, fillColor: [245, 245, 245], textColor: [0, 0, 0]},
        1: {cellWidth: 80}
      },
      body: [
        ['Total HT', this.totalArticlesHT+' '+'DT'],
        ['Total TVA', this.totalArticlesTVA+' '+'DT'],
        ['Total TTC', this.totalArticlesTTC+' '+'DT'],
        
        //['NET À PAYER', '200,000']
      ],
      theme: 'grid',
    });
    
    //   styles: {font: 'Amiri', fontSize: 12, halign: 'left', textColor: 1},
    //   //  styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 2, overflow: 'linebreak'},
    //   // margin: {right: 375},
    //   startY: y,
    //   headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
    //   margin: {left: 50},
    //   columnStyles: {
    //     0: {cellWidth: 40},
    //     1: {cellWidth: 80, },
    //     2: {cellWidth: 80, }
    //   },
    //   head: [['', 'Base TVA', 'Total TVA']],
    //   body: [
    //     ['100%', '4', '2000'],
    //     ['7%', '57', '2500'],
    //     ['4%', '57', '3400'],
    //     ['2%', '360', '1500'],
    //     ['7%', '75', '1400']],
    //   theme: 'grid',
    // });
    doc.setFontSize(13);
    const testText3 = 'ARRÊTER LA PRÉSENTE FACTURE À LA SOMME :\n' +
    this.commandebyid.factureDTO.totalLettre    ;
    doc.text(testText3, 25, (doc as any).lastAutoTable.finalY + 40, {align: 'left'});
    doc.setFontSize(15);
    const testText5 = 'Signature et cachet  ';
    doc.text(testText5, 25, (doc as any).lastAutoTable.finalY + 120, {align: 'left'});
    const testText6 = 'Notes';
    doc.text(testText6, doc.internal.pageSize.width / 2, (doc as any).lastAutoTable.finalY + 120, {align: 'left'});
    const pages = doc.getNumberOfPages();
    doc.setFontSize(10);
    // for (let j = 1; j < pages + 1; j++) {
    //   doc.setPage(j);
    //   const str = ' Bir El Hafey 5136 - SidiBouzid, TUNISIE - Téléphone: 21 828 389 - E-mail: abdelkalek@gmail.com';
    //   doc.setFontSize(10);
    //   doc.text(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 25, {align: 'center'});   //key is the interal pageSize function
    //   doc.setDrawColor(0, 0, 0);  // draw red lines
    //   doc.line(30, doc.internal.pageSize.height - 35, 560, doc.internal.pageSize.height - 35); // horizontal line
    //   const stra = 'au Capital: - C.D: -Code TVA: 1234567/M/A/B/000';
    //   doc.setFontSize(10);
    //   doc.text(stra, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 15, {align: 'center'});
    // }
    doc.save('FacturefR_v2.pdf');
  }
  
  
  
  }


