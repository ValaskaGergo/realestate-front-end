import {anlibreedersExample} from "./anlibreeders.example";
import {anlibreedersI18n} from "./anlibreeders.i18n";
import {anlibreedersMenu} from "./anlibreeders.menu";
import {anlibreedersScrollbar} from "./anlibreeders.scrollbar";
import {anlibreedersModals} from "./anlibreeders.modals";
import {anlibreedersSignUp} from "./anlibreeders.signUp";
import {anlibreedersSignIn} from "./anlibreeders.signIn";
import {anlibreedersSignOut} from "./anlibreeders.signOut";
import {anlibreedersPasswordReset} from "./anlibreeders.passwordReset";
import {anlibreedersAdminSettings} from "./anlibreeders.adminSettings";
import {anlibreedersGlobal} from "./anlibreeders.global";
import {anlibreedersBillingAndShippingAddress} from "./anlibreeders.billingAndShippingAddress";
import {anlibreedersUserManagement} from "./anlibreeders.userManagement";
import {anlibreedersSecurity} from "./anlibreeders.security";
import {anlibreedersAccountPayment} from "./anlibreeders.accountPayment";
import {anlibreedersInvoices} from "./invoices";
import {anlibreedersCategory} from "./anlibreeders.category";
import {anlibreedersSubCategory} from "./anlibreeders.subCategory";
import {anlibreedersAnimal} from "./anlibreeders.animal";
import {anlibreedersAnimalMedia} from "./anlibreeders.animalMedia";
import {anlibreedersNotification} from "./anlibreeders.notification";
import {anlibreedersSocket} from "./anlibreeders.socket";
import {anlibreedersList} from "./anlibreeders.list";
import {anlibreedersFull} from "./anlibreeders.full";
import {anlibreedersSearch} from "./anlibreeders.search";
import {anlibreedersTalk} from "./anlibreeders.talk";
import {anlibreedersFullAction} from "./anlibreeders.fullAction";
import {anlibreedersAdvertisement} from "./anlibreeders.advertisement";
import {anlibreedersChangeColors} from "./anlibreeders.changeColors";
import {anlibreedersStatus} from "./anlibreeders.status";
import {anlibreedersMap} from "./anlibreeders.map";

class App {
    loadApp() {
        anlibreedersExample.loadAnlibreedersExample();
        anlibreedersI18n.loadAnlibreedersI18n();
        anlibreedersMenu.loadAnlibreedersMenu();
        anlibreedersScrollbar.loadAnlibreedersScrollbar();
        anlibreedersModals.loadAnlibreedersModals();
        anlibreedersSignUp.loadAnlibreedersSignUp();
        anlibreedersSignIn.loadAnlibreedersSignIn();
        anlibreedersSignOut.loadAnlibreedersSignOut();
        anlibreedersPasswordReset.loadAnlibreedersPasswordReset();
        anlibreedersAdminSettings.loadAnlibreedersAdminSettings();
        anlibreedersGlobal.loadAnlibreedersGlobal();
        anlibreedersBillingAndShippingAddress.loadAnlibreedersBillingAndShippingAddress();
        anlibreedersUserManagement.loadAnlibreedersUserManagement();
        anlibreedersSecurity.loadAnlibreedersSecurity();
        anlibreedersAccountPayment.loadAnlibreedersAccountPayment();
        anlibreedersInvoices.loadAnlibreedersInvoices();
        anlibreedersCategory.loadAnlibreedersCategory();
        anlibreedersSubCategory.loadAnlibreedersSubCategory();
        anlibreedersAnimal.loadAnlibreedersAnimal();
        anlibreedersAnimalMedia.loadAnlibreedersAnimalMedia();
        anlibreedersNotification.loadAnlibreedersNotification();
        anlibreedersSocket.loadAnlibreedersSocket();
        anlibreedersList.loadAnlibreedersList();
        anlibreedersFull.loadAnlibreedersFull();
        anlibreedersSearch.loadAnlibreedersSearch();
        anlibreedersTalk.loadAnlibreedersTalk();
        anlibreedersFullAction.loadAnlibreedersFullAction();
        anlibreedersAdvertisement.loadAnlibreedersAdvertisement();
        anlibreedersChangeColors.loadAnlibreedersChangeColors();
        anlibreedersStatus.loadAnlibreedersStatus();
        anlibreedersMap.loadAnlibreedersMap();
    }
}

export let app = new App();