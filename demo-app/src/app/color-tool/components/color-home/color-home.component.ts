import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Store, Select } from '@ngxs/store';

import { IColorToolStateModel } from '../../states/color-tool.state';
import { Color, NewColor } from '../../models/colors';
import { AppendColor, RemoveColor, RefreshColors } from '../../actions/color-actions';

@Component({
  selector: 'app-color-home',
  templateUrl: './color-home.component.html',
  styleUrls: ['./color-home.component.css']
})
export class ColorHomeComponent implements OnInit {

  colorForm!: FormGroup;

  // STEP: 2 - Selector
  @Select((state: { colorTool: IColorToolStateModel }) => {
    return state.colorTool.colors.map(c => ({
      ...c,
      name: c.name.toUpperCase(),
    }));
  })
  colors$!: Observable<Color[]>;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.colorForm = this.fb.group({
      name: '',
      hexcode: '',
    });

    this.store.dispatch(new RefreshColors());
  }

  // STEP 4: Function
  async doAddColor() {
    const newColor = this.colorForm.value as NewColor;
    // STEP 5: Dispatch the Action
    // this.store
    //   .dispatch(new AppendColor(newColor))
    //   .pipe(
    //     tap(data => { console.log(data); console.log("all done"); }
    //     )).subscribe();

    const state = await this.store.dispatch(new AppendColor(newColor)).toPromise();

    console.log(state);

  }

  doDeleteColor(colorId: number) {
    this.store.dispatch(new RemoveColor(colorId));
  }

}
