// types.ts

export interface ServiceRequestData {
  id: string;
  name: string;
  email: string;
  service: string;
  details: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface TranslationContent {
  nav: {
    home: string;
    services: string;
    team: string;
    contact: string;
    imageGeneration: string;
    photoEditor: string;
    requestService: string;
    admin: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: {
    title: string;
    items: {
      title: string;
      description: string;
      price?: string;
    }[];
    outro: string;
  };
  team: {
    title: string;
    members: {
      name: string;
      role: string;
    }[];
  };
  imageGeneration: {
    title: string;
    promptLabel: string;
    promptPlaceholder: string;
    buttonText: string;
    generatingText: string;
  };
  photoEditor: {
    title: string;
    uploadLabel: string;
    backgroundRemover: string;
    enhancer: string;
    passportPhoto: string;
    removeBg: string;
    enhanceImage: string;
    formatPassport: string;
    processing: string;
    download: string;
    original: string;
    edited: string;
  };
  serviceRequest: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    submitButton: string;
    statusCheck: string;
    requestIdPlaceholder: string;
    checkButton: string;
    thankYouTitle: string;
    thankYouMessage: string;
    yourRequestId: string;
    statusLabels: {
      pending: string;
      inProgress: string;
      completed: string;
    };
  };
  contact: {
    title: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    socials: string;
    instagram: string;
  };
  chatbot: {
    title: string;
    placeholder: string;
  };
  login: {
    title: string;
    usernameLabel: string;
    passwordLabel: string;
    loginButton: string;
    errorMessage: string;
  };
  adminPanel: {
    title: string;
    welcome: string;
    logout: string;
    requestsTitle: string;
    headers: {
      id: string;
      name: string;
      service: string;
      status: string;
      action: string;
    };
    noRequests: string;
  };
}

export type Language = 'en' | 'hi';
