import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from './components/search/search.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import {  HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TableComponent } from './components/table/table.component';
import { PaggerComponent } from './components/pagger/pagger.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { NotDataComponent } from './components/not-data/not-data.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    TableComponent,
    PaggerComponent,
    NotDataComponent
  ],
  imports: [
    CommonModule,
    // PerfectScrollbarModule,
    SearchModule,
    NgbModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    NgbNavModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [TableComponent, TranslateModule,PaggerComponent],
  providers: [JwtHelperService, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    
  ]
})
export class SharedModule { }
