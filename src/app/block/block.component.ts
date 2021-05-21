import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
})
export class BlockComponent implements OnInit {
  @Input() title = '';
  @Input() showLoading = false;
  @Output() loading = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  startLoading(): void {
    console.log('[startLoading] ...');
    this.loading.emit(true);
  }

  stopLoading(): void {
    console.log('[stopLoading] ...');
    this.loading.emit(false);
  }
}
