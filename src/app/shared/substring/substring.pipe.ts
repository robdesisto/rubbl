import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'substring'
})
export class SubStringPipe implements PipeTransform {

    /**
     * This isn't the most re-usable thing in the world because it takes a short cut. Still I usually put pipes somewhere sharable from the start because
     * they otherwise have a tendency to get duplicated.
     */
    transform(value: string, prefix?: string): string {
        return value.substr(prefix.length);
    }
}
