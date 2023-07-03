import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'ingenieria',
        loadChildren: () =>
            import('./features/ingenieria/ingenieria.module').then(
                (m) => m.IngenieriaModule
            ),
    },
    {
        path: 'terapias-alternativas',
        loadChildren: () =>
            import(
                './features/terapias-alternativas/terapias-alternativas.module'
            ).then((m) => m.TerapiasAlternativasModule),
    },
    {
        path: 'recursos',
        loadChildren: () =>
            import('./features/recursos/recursos.module').then(
                (m) => m.RecursosModule
            ),
    },
    {
        path: 'redes-de-contacto',
        loadChildren: () =>
            import(
                './features/redes-de-contacto/redes-de-contacto.module'
            ).then((m) => m.RedesDeContactoModule),
    },
    {
        path: 'agenda',
        loadChildren: () =>
            import('./features/appointments/appointments.module').then(
                (m) => m.AppointmentsModule
            ),
    },
    { path: 'hora-confirmada', loadChildren: () => import('./features/hora-confirmada/hora-confirmada.module').then(m => m.HoraConfirmadaModule) },
    { path: 'confirmacion-fallida', loadChildren: () => import('./features/confirmacion-fallida/confirmacion-fallida.module').then(m => m.ConfirmacionFallidaModule) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top',
            initialNavigation: 'enabledBlocking',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
