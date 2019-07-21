import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feature } from './app.state';

@Injectable({ providedIn: 'root' })
export class AppService {
    // Normally this service would be stateless just passing things through
    private dictionary: string[] = ['Run', 'Rap', 'Raw', 'Rose', 'Rain'];
    private features: Feature[] = [
        {
            src: '//s.dspncdn.com/a1/webapp/img/content/featured/color-search-is-back-bg.jpg',
            cta: '#color-search'
        },
        {
            src: '//s.dspncdn.com/a1/webapp/img/content/featured/follow_instagram.jpg',
            cta: '#gettin-instas'
        },
        {
            src: '//s.dspncdn.com/a1/webapp/img/content/featured/welcome_signup.jpg',
            cta: '#signup'
        },
        {
            src: '//dspncdn.com/a1/prm/1512x/bb3b5b107eea6954818de5fdf74bf371.jpg',
            cta: '#moo-whatever-the-hell-that-is'
        }
    ];

    // IRL this is what'd call out to Angular's Http client. Instead we'll just filter the array.
    getResults(query: string): Observable<string[]> {
        if (!query) {
            return of([]);
        }
        return of(this.dictionary.filter(r => r.toLowerCase().indexOf(query) === 0));
    }

    getFeatures() {
        return of(this.features);
    }
}
