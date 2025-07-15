import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmacion-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>
      <p>{{ data.mensaje }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="confirmar()">Confirmar</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmacionDialogComponent {
  // Inyecta el dialogo y los datos necesarios
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}

  // Método para confirmar la acción
  confirmar(): void {
    this.dialogRef.close(true);
  }

  // Método para cancelar la acción
  cancelar(): void {
    this.dialogRef.close(false);
  }
}
