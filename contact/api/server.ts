import {Contact} from "../types";
import schemas from "../schemas";
import {database, firestore} from "~/firebase/admin";
import {ClientTenant} from "~/tenant/types";


export default {
	list: async (tenant: ClientTenant["id"]): Promise<Contact[]> => {
		return database
      .collection("tenants")
      .doc(tenant)
      .collection("contacts")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Contact), id: doc.id})))
      .then((contacts) => contacts.map((contact) => schemas.client.fetch.cast(contact)));
	  },	
  create: (tenant: ClientTenant["id"], contact: Contact) => {
    const newContact = database.collection("tenants").doc(tenant).collection("contacts").doc();
    contact['createdAt'] = firestore.Timestamp.now().seconds;
    contact["id"] = newContact.id;
    const casted = schemas.server.create.cast(contact);

    return newContact
      .set(casted)
      .then((snapshot) => {
        const contact: Contact = {...casted, id: snapshot['id']};

        return contact;
      });
  },
  update: (tenant: ClientTenant["id"], {id, ...contact}: Contact) => {
    const casted = schemas.server.update.cast(contact);

    return database
      .collection("tenants")
      .doc(tenant)
      .collection("contacts")
      .doc(id)
      .update(casted)
      .then(() => casted);
  },
  remove: (tenant: ClientTenant["id"], contact: Contact["id"]) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("contacts")
      .doc(contact)
      .delete()
      .then(() => contact),

  hookcontact: (tenant: ClientTenant["id"], contact: Contact) => {
    //const casted = schemas.server.create.cast(product);
    
    // SIN AWAIT
    const firestoreRef = database.collection('tenants').doc(tenant).collection("contacts").where('phone', '==', contact['phone']);
    // const queryRef = firestoreRef.where('phone', '==', contact['phone']);
    // let salesContact = process.browser ? window.localStorage?.getItem(tenant.slug) : '';
    // let finallySales =  salesContact ? salesContact : 'phone';
    // console.log(finallySales)


    return firestoreRef.get().then((querySnapshot) => {
      const matchedDocs = querySnapshot.size
      if (matchedDocs) {
        querySnapshot.docs.forEach(doc => {
          // if(typeof window !== "undefined") window.localStorage?.setItem(tenant, doc.data().sales);
          
          var visitsPastValue = doc.data().visitsPast ? doc.data().visitsPast : 0;
          var createdAtPastValue = doc.data().createdAtPast ? doc.data().createdAtPast : firestore.Timestamp.now().seconds;
          var pastInfoValue = doc.data().pastInfo ? doc.data().pastInfo : '';
          contact['name'] = doc.data().name;
          contact['description'] = doc.data().description;
          contact['location'] = doc.data().location;
          contact['pastInfo'] = pastInfoValue;
          // contact['sales'] = doc.data().sales;
          contact['createdAt'] = doc.data().createdAt == 1594090800000 ? firestore.Timestamp.now().seconds : doc.data().createdAt;;
          contact['createdAtPast'] = createdAtPastValue;
          contact['updatedAt'] = firestore.Timestamp.now().seconds;
          contact['visitsPast'] = visitsPastValue;
          contact['visits'] = doc.data().visits + 1;
          // return database
          //   .collection("tenants")
          //   .doc(tenant)
          //   .collection("contacts")
          //   .doc(doc.id)
          //   // .update({
          //   //   name: contact.name,
          //   //   description: contact.description,
          //   //   location: contact.location,
          //   //   pastInfo: contact.pastInfo,
          //   //   createdAt: contact.createdAt,
          //   //   updatedAt: contact.updatedAt,
          //   //   visitsPast: contact.visitsPast,
          //   //   visits: contact.visits
          //   // })
          //   // .update(contact)
          //   .set(contact, {merge: true})
          //   // .then(() => contact);
          const ref = database.collection("tenants").doc(tenant).collection("contacts").doc(doc.id);
          database.runTransaction(async transaction => {
            const contactSnapshot = await transaction.get(ref);
            if (!contactSnapshot.exists) {
                return;
            }
            transaction.update(ref, contact);
          });
        })
      } else {
        contact['createdAt'] = firestore.Timestamp.now().seconds;
        contact['createdAtPast'] = firestore.Timestamp.now().seconds;
        contact['updatedAt'] = firestore.Timestamp.now().seconds;
        // contact['sales'] = finallySales;
        contact['visits'] = 1;
        return database
          .collection("tenants")
          .doc(tenant)
          .collection("contacts")
          .add(contact)
          // .then();
      }
    })
    // return 'hookcontact success'




    // DEFAULT
    // contact['createdAt'] = firestore.Timestamp.now().seconds;
    // contact['updatedAt'] = firestore.Timestamp.now().seconds;
    
    // return database
    //   .collection("tenants")
    //   .doc(tenant)
    //   .collection("contacts")
    //   .add(contact)
    //   .then();
  },
}