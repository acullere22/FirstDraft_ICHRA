//our root app component
import {Component, ViewChild } from '@angular/core';
import {TabsComponent } from './tabs/tabs.component';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Alex', weight: 1.0079, symbol: 'MA', status:'F'},
  {position: 2, name: 'Scott', weight: 4.0026, symbol: 'NH', status:'F'},
  {position: 3, name: 'John', weight: 6.941, symbol: 'MA', status:'F'},
  {position: 4, name: 'Andreu', weight: 9.0122, symbol: 'RI', status:'F'},
  {position: 5, name: 'Anna', weight: 10.811, symbol: 'MA', status:'F'},
  {position: 6, name: 'Alexandra', weight: 12.0107, symbol: 'NH', status:'F'},
  {position: 7, name: 'George', weight: 14.0067, symbol: 'MA', status:'F'},
  {position: 8, name: 'Chuck', weight: 15.9994, symbol: 'CT', status:'F'},
  {position: 9, name: 'Daniel', weight: 18.9984, symbol: 'RI', status:'F'},
  {position: 10, name: 'Shaun', weight: 20.1797, symbol: 'RI', status:'F'},
  {position: 11, name: 'Alexandra', weight: 12.0107, symbol: 'NH', status:'F'},
  {position: 12, name: 'George', weight: 14.0067, symbol: 'MA', status:'F'},
  {position: 13, name: 'Chuck', weight: 15.9994, symbol: 'CT', status:'F'},
];

@Component({
  selector: 'app.component',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  @ViewChild('personEdit') editPersonTemplate;
  @ViewChild('about') aboutTemplate;
  @ViewChild(TabsComponent) tabsComponent;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = new ExampleDataSource();

  people = [
    {
      id: 1,
      name: 'Juri',
      surname: 'Strumpflohner',
      twitter: '@juristr',
    },
  ];

  classes = [
    {
      id: 1,
      name: 'Example',
      locations: 'MA',
      twitter: '@juristr',
    },
  ];

  onEditPerson(person) {
    this.tabsComponent.openTab(
      `Editing ${person.name}`,
      this.editPersonTemplate,
      person,
      true
    );
  }

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  }

  onPersonFormSubmit(dataModel) {
    if (dataModel.id > 0) {
      this.people = this.people.map((person) => {
        if (person.id === dataModel.id) {
          return dataModel;
        } else {
          return person;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.people.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }
}
export class ExampleDataSource extends DataSource<PeriodicElement> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PeriodicElement[]> {
    return this.data;
  }

  disconnect() {}
}

