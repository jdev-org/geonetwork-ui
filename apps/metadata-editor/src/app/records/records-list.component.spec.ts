import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { RecordsListComponent } from './records-list.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

const results = [{ md: true }]
const currentPage = 5
const totalPages = 25

@Component({
  // eslint-disable-next-line
  selector: 'gn-ui-results-table',
  template: '',
  standalone: true,
})
export class RecordTableComponent {
  @Output() recordClick = new EventEmitter<CatalogRecord>()
}

@Component({
  // eslint-disable-next-line
  selector: 'gn-ui-pagination-buttons',
  template: '',
  standalone: true,
})
export class PaginationButtonsComponent {
  @Input() currentPage = 1
  @Input() totalPages = 1
  @Input() hideButton = false
  @Output() newCurrentPageEvent = new EventEmitter<number>()
}

class SearchFacadeMock {
  results$ = new BehaviorSubject(results)
  currentPage$ = new BehaviorSubject(currentPage)
  totalPages$ = new BehaviorSubject(totalPages)
  resultsHits$ = new BehaviorSubject(1000)
  setConfigRequestFields = jest.fn(() => this)
  setPageSize = jest.fn(() => this)
  setSortBy = jest.fn(() => this)
}
class SearchServiceMock {
  setPage = jest.fn()
  setSortBy = jest.fn()
}
class RouterMock {
  navigate = jest.fn()
}

describe('RecordsListComponent', () => {
  let component: RecordsListComponent
  let fixture: ComponentFixture<RecordsListComponent>
  let router: Router
  let searchService: SearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: SearchService,
          useClass: SearchServiceMock,
        },
      ],
    }).overrideComponent(RecordsListComponent, {
      set: {
        imports: [
          CommonModule,
          MatIconModule,
          RecordTableComponent,
          PaginationButtonsComponent,
        ],
      },
    })
    router = TestBed.inject(Router)
    searchService = TestBed.inject(SearchService)
    fixture = TestBed.createComponent(RecordsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when search results', () => {
    let table, pagination
    beforeEach(() => {
      table = fixture.debugElement.query(
        By.directive(RecordTableComponent)
      ).componentInstance
      pagination = fixture.debugElement.query(
        By.directive(PaginationButtonsComponent)
      ).componentInstance
    })
    it('displays record table', () => {
      expect(table).toBeTruthy()
    })
    it('displays pagination', () => {
      expect(pagination).toBeTruthy()
      expect(pagination.currentPage).toEqual(currentPage)
      expect(pagination.totalPages).toEqual(totalPages)
    })
    describe('when click on a record', () => {
      const uniqueIdentifier = 123
      const singleRecord = {
        ...DATASET_RECORDS[0],
        uniqueIdentifier,
      }
      beforeEach(() => {
        table.recordClick.emit(singleRecord)
      })
      it('routes to record edition', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/edit', 123])
      })
    })
    describe('when click on pagination', () => {
      beforeEach(() => {
        pagination.newCurrentPageEvent.emit(3)
      })
      it('paginates', () => {
        expect(searchService.setPage).toHaveBeenCalledWith(3)
      })
    })
  })
})
