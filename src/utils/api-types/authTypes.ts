export type RegisterRequest = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  isAgent: boolean;
  agencyName?: string;
  isRealEstate: boolean;
};

export type RegisterResponse = {
  data: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    isAgent: boolean;
    agencyName: string;
    isRealEstate: boolean;
  };
  token: string;
  message: string;
  isSuccess: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  isSuccess: boolean;
  authData: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    isAgent: boolean;
    agencyName: string;
    isRealEstate: boolean;
  };
  token: string;
  message: string;
};

export type VerifyRequest = {
  email: string;
  code: string;
};

export type VerifyResponse = {
  data: {};
  message: string;
  isSuccess: boolean;
};

export type UpdateUserRequest = {
  fullName: string;
  userId: string;
  phone: string;
};

export type DeliveryRequest = {
  name: string;
  phoneNumber: string;
  city: string;
  address: string;
  userId: string;
};

export type DeliveryResponse = {
  data: {
    _id: string;
    address: string;
    city: string;
    name: string;
    phoneNumber: string;
    userId: string;
  }[];
  message: string;
  isSuccess: boolean;
};

export type PaymentCardRequest = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  userId: string;
  type: string;
};

export type PaymentCardResponse = {
  data: {
    _id: string;
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    userId: string;
    type: string;
  }[];
  message: string;
  isSuccess: boolean;
};

export type CategoryResponse = {
  data: {
    _id: string;
    name: string;
    icon?: string;
  }[];
  message: string;
  isSuccess: boolean;
};

export type ProductResponse = {
  data: {
    _id: string;
    name: string;
    categoryId: string;
    brandId: string;
    type: string;
    availability: string;
    description: string;
    specification: string;
    image: {}[];
    amount: string;
    price: string;
    rating: string;
    color: string;
    size: [];
    noOfItems: string;
  }[];
  message: string;
  isSuccess: boolean;
};

export type CartResponse = {
  data: {
    product: string;
    amount: string;
    count: string;
    userId: string;
    dateCreated: string;
    dateModified: string;
    _id: string;
  }[];
  message: string;
  isSuccess: boolean;
};

export type CartRequest = {
  product: string;
  amount: string;
  count: number;
  userId: string;
};

export type OneProductResponse = {
  data: {
    id: string;
    name: string;
    categoryId: string;
    brandId: string;
    type: string;
    availability: string;
    description: string;
    specification: string;
    image: {}[];
    amount: string;
    price: string;
    rating: string;
    color: string;
    size: [];
    noOfItems: string;
  };
  message: string;
  isSuccess: boolean;
};

export type PropertyRequest = {
  title: string;
  address: string;
  mainImage: string;
  images?: {}[];
  type: string;
  size?: string;
  description?: string;
  agentId: string;
  categoryId: string;
  bedroom?: string;
  bathroom?: string;
  facilities?: string;
  price?: string;
  carModel?: string;
  carYear?: string;
};

export type PropertyObject = {
  id: string;
  title: string;
  address: string;
  images?: {}[];
  mainImage: string;
  type?: string;
  size?: string;
  description?: string;
  agentId: string;
  categoryId: string;
  bedroom?: string;
  bathroom?: string;
  facilities?: string;
  price?: string;
  approved: boolean;
  carModel?: string;
  carYear?: string;
};

export type CreatePropertyResponse = {
  data: PropertyObject[];
  message: string;
  isSuccess: boolean;
};

export type InspectionRequest = {
  inspectorId: string;
  inpectionDate: string;
  inspectionTime: string;
  propertyId: string;
};

export type InspectionResponse = {
  message: string;
  isSuccess: boolean;
  responseCode: string;
};
