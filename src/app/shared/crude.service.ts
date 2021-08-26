import {
  AngularFirestore,
  DocumentChangeAction,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BaseModel {
  id: string;
  dataDeCriacao: string | Date;
}

export abstract class CrudeService<T extends BaseModel> {
  constructor(
    protected collectionName: string,
    protected firestore: AngularFirestore
  ) {}

  protected getCollection() {
    return this.firestore.collection<T>(this.collectionName);
  }

  salvarFirestore(model: T) {
    const { id, ...payload } = model;
    if (model?.id == null) {
      this.getCollection().add(payload as T);
    } else {
      this.firestore
        .collection(this.collectionName)
        .doc(id)
        .set(payload, { merge: true });
    }
  }

  listarFirestore(): Observable<T[]> {
    return this.getCollection()
      .snapshotChanges()
      .pipe(map((models) => models.map(this.mapearReferencia.bind(this))));
  }

  deletarFirestore(model: T) {
    return this.getCollection().doc(model.id).delete();
  }

  protected mapearReferencia(modelRef: DocumentChangeAction<T>): T {
    const doc = modelRef?.payload?.doc;
    return this.mapearReferenciaSnapshot(doc);
  }

  protected mapearReferenciaSnapshot(doc: QueryDocumentSnapshot<T>): T {
    const data = doc.data();
    data.id = doc.id;
    const timestamp = data.dataDeCriacao as any;
    if (typeof data.dataDeCriacao === 'object') {
      data.dataDeCriacao = new Date(timestamp?.toMillis());
    }
    return data;
  }
}
