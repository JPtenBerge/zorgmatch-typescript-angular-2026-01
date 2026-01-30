import { InputSignal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

type UnwrapSignal<T> = T extends InputSignal<infer U> ? U : never;

export function setInput<
	TComponent,
	TKey extends {
		[K in keyof TComponent]: TComponent[K] extends InputSignal<any> ? K : never;
	}[keyof TComponent],
>(fixture: ComponentFixture<TComponent>, key: TKey, value: UnwrapSignal<TComponent[TKey]>): void {
	fixture.componentRef.setInput(key as string, value);
}
