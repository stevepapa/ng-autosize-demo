import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'textarea[autosize]',
  standalone: true,
  exportAs: 'autosize'
})
export class Autosize implements AfterViewInit {
  private readonly el: HTMLTextAreaElement;
  private clientWidth: number;

  private minHeightPx?: number;
  private maxHeightPx?: number;

  @Input()
  set minHeight(value: number | string | undefined) {
    this.minHeightPx = this.parsePx(value);
    this.applyMinHeight();
  }

  @Input()
  set maxHeight(value: number | string | undefined) {
    this.maxHeightPx = this.parsePx(value);
    this.applyMaxHeight();
  }

  constructor(element: ElementRef<HTMLTextAreaElement>) {
    this.el = element.nativeElement;
    this.clientWidth = this.el.clientWidth;
  }

  ngAfterViewInit(): void {
    const style = window.getComputedStyle(this.el);
    if (style.resize === 'both') this.el.style.resize = 'horizontal';
    else if (style.resize === 'vertical') this.el.style.resize = 'none';

    this.refresh();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.el.clientWidth === this.clientWidth) return;
    this.clientWidth = this.el.clientWidth;
    this.refresh();
  }

  @HostListener('input')
  onInput(): void {
    this.refresh();
  }

  refresh(): void {
    // Allow pending DOM/layout updates to settle (e.g. programmatic value changes).
    queueMicrotask(() => this.adjust());
  }

  private adjust(): void {
    this.el.style.overflow = 'hidden';
    this.el.style.height = 'auto';

    const nextHeight = this.clampHeight(this.el.scrollHeight);
    this.el.style.height = `${nextHeight}px`;

    if (this.maxHeightPx !== undefined && this.el.scrollHeight > this.maxHeightPx) {
      this.el.style.overflow = 'auto';
    }
  }

  private clampHeight(height: number): number {
    if (this.minHeightPx !== undefined) height = Math.max(height, this.minHeightPx);
    if (this.maxHeightPx !== undefined) height = Math.min(height, this.maxHeightPx);
    return height;
  }

  private applyMinHeight(): void {
    if (this.minHeightPx === undefined) {
      this.el.style.minHeight = '';
      return;
    }
    this.el.style.minHeight = `${this.minHeightPx}px`;
  }

  private applyMaxHeight(): void {
    if (this.maxHeightPx === undefined) {
      this.el.style.maxHeight = '';
      return;
    }
    this.el.style.maxHeight = `${this.maxHeightPx}px`;
  }

  private parsePx(value: number | string | undefined): number | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;

    const trimmed = value.trim();
    const match = trimmed.match(/^(\d+(?:\.\d+)?)(px)?$/i);
    if (!match) return undefined;
    return Number(match[1]);
  }
}

