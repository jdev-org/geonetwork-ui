import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CHART_ITEM_FIXTURE } from './chart.fixtures'
import { ChartComponent } from './chart.component'
import { Chart } from 'chart.js'
import { ChangeDetectionStrategy } from '@angular/core'

jest.mock('chart.js')
Chart.register = jest.fn()

describe('ChartComponent', () => {
  let component: ChartComponent
  let fixture: ComponentFixture<ChartComponent>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    })
      .overrideComponent(ChartComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(ChartComponent)
    component = fixture.componentInstance
    component.data = CHART_ITEM_FIXTURE
    component.labelProperty = 'name'
    component.valueProperty = 'age'
    component.type = 'bar'
    component.ngOnChanges()
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('before view is ready', () => {
    it('does not create a chart', () => {
      expect(Chart).not.toHaveBeenCalled()
    })
  })

  describe('when view is ready', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })
    it('should create chart', () => {
      expect(Chart).toHaveBeenCalledWith(expect.any(HTMLElement), {
        data: {
          datasets: [
            {
              data: [15, 10, 55],
              label: 'age',
            },
          ],
          labels: ['name 1', 'name 2', 'name 3'],
        },
        options: {
          aspectRatio: 2.5,
          parsing: {},
          scales: {
            x: {
              position: 'bottom',
              type: 'category',
            },
          },
        },
        type: 'bar',
      })
    })

    describe('when data changes', () => {
      beforeEach(() => {
        component.data = CHART_ITEM_FIXTURE.slice(0, 2)
        component.ngOnChanges()
        fixture.detectChanges()
      })
      it('should create chart with new data', () => {
        expect(Chart).toHaveBeenCalledTimes(2)
        expect(Chart).toHaveBeenLastCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            data: {
              datasets: [
                {
                  data: [15, 10],
                  label: 'age',
                },
              ],
              labels: ['name 1', 'name 2'],
            },
          })
        )
      })
    })

    describe('when axis values change', () => {
      beforeEach(() => {
        component.labelProperty = 'id'
        component.valueProperty = 'amount'
        component.ngOnChanges()
        fixture.detectChanges()
      })
      it('should create chart with new data', () => {
        expect(Chart).toHaveBeenCalledTimes(2)
        expect(Chart).toHaveBeenLastCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            data: {
              datasets: [
                {
                  data: [100, 101, 102],
                  label: 'amount',
                },
              ],
              labels: ['id 1', 'id 2', 'id 3'],
            },
          })
        )
      })
    })

    describe('when chart type changes', () => {
      beforeEach(() => {
        component.type = 'pie'
        component.ngOnChanges()
        fixture.detectChanges()
      })
      it('should create chart with new data', () => {
        expect(Chart).toHaveBeenCalledTimes(2)
        expect(Chart).toHaveBeenLastCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            type: 'pie',
          })
        )
      })
    })
  })

  describe('chart with secondary value', () => {
    beforeEach(() => {
      component.type = 'scatter'
      component.labelProperty = 'id'
      component.secondaryValueProperty = 'amount'
      fixture.detectChanges()
    })
    it('should create chart', () => {
      expect(Chart).toHaveBeenCalledWith(expect.any(HTMLElement), {
        data: {
          datasets: [
            {
              data: [
                {
                  x: 100,
                  y: 15,
                },
                {
                  x: 101,
                  y: 10,
                },
                {
                  x: 102,
                  y: 55,
                },
              ],
              label: 'age',
            },
          ],
          labels: ['id 1', 'id 2', 'id 3'],
        },
        options: {
          aspectRatio: 2.5,
          parsing: {},
          scales: {
            x: {
              position: 'bottom',
              type: 'linear',
            },
          },
        },
        type: 'scatter',
      })
    })
  })

  describe('chart types', () => {
    describe('scatter chart (no secondary value)', () => {
      beforeEach(() => {
        component.type = 'scatter'
        fixture.detectChanges()
      })
      it('should create chart', () => {
        expect(Chart).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            options: expect.objectContaining({
              scales: {
                x: {
                  position: 'bottom',
                  type: 'category',
                },
              },
            }),
            type: 'scatter',
          })
        )
      })
    })
    describe('line interpolated chart', () => {
      beforeEach(() => {
        component.type = 'line-interpolated'
        fixture.detectChanges()
      })
      it('should create chart', () => {
        expect(Chart).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            options: expect.objectContaining({
              elements: {
                line: {
                  cubicInterpolationMode: 'monotone',
                },
              },
            }),
            type: 'line',
          })
        )
      })
    })
    describe('horizontal bar chart', () => {
      beforeEach(() => {
        component.type = 'bar-horizontal'
        fixture.detectChanges()
      })
      it('should create chart', () => {
        expect(Chart).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            options: expect.objectContaining({
              indexAxis: 'y',
            }),
            type: 'bar',
          })
        )
      })
    })
  })
})
