import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Car, CarKeys } from '../../models/cars';

import { FakeCurrencyPipe } from '../../fakes/fake-pipes';
import { CarViewRowComponent } from './car-view-row.component';

describe('CarViewRowComponent', () => {
  let component: CarViewRowComponent;
  let fixture: ComponentFixture<CarViewRowComponent>;

  const car: Car = {
    id: 1,
    make: 'Ford',
    model: 'Focus',
    year: 1998,
    color: 'magenta',
    price: 2000,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FakeCurrencyPipe, // using a fake pipe to avoid the formatting to ease testing
        CarViewRowComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarViewRowComponent);
    component = fixture.componentInstance;
    component.car = car;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate table row with car', () => {

    const fields: CarKeys[] = [ 'id', 'make', 'model', 'year', 'color', 'price' ];

    const tdElements = fixture.debugElement
      .queryAll(By.css('td'))
      .map(de => de.nativeElement)
      .slice(0, fields.length);

    tdElements.forEach( (el, index) => {
      expect(el.textContent)
        .toEqual(String(car[fields[index]]));
    });

  });

  it('should emit car id when edit button clicked', () => {

    const spy = jest.fn();

    component.editCar.subscribe(spy);

    const button = fixture.debugElement
      .query(By.css('button:nth-child(1)'))
      .nativeElement;

    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith(car.id);
  });

  it('should emit car id when delete button clicked', () => {

    const spy = jest.fn();

    component.deleteCar.subscribe(spy);

    const button = fixture.debugElement
      .query(By.css('button:nth-child(2)'))
      .nativeElement;

    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith(car.id);
  });


});
