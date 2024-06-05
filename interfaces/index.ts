export interface IBusiness {
  id: String;
  email: String;
  name: String;
  description: String;
  url: String;
  logo: String;
}

export interface ICharity {
  id: String;
  email: String;
  name: String;
  description: String;
  url: String;
  logo: String;
}

export interface IDonor {
  id: String;
  email: String;
  firstName: String;
  lastName: String;
  phone: String;
}

export interface IDonorToCharity {
  id: String;
  charityId: String;
  donorId: String;
  giftMeURL: String;
  isActive?: Boolean;
  giftCardId?: String;
}

export interface IGiftingBox {
  id: String;
  businessId: String;
  businessBoxId: String;
}

export interface CharityToGiftingBox {
  id: String;
  charityId: String;
  giftingBoxId: String;
}

export interface IBusinessBox {
  id: String;
  businessId: String;
}

export interface IGiftCard {
  id: String;
  value: Number;
  expiry: String;
  description: String;
}

export interface IBusinessBoxToGiftCard {
  id: String;
  businessBoxId: String;
  giftCardId: String;
  quantity: number;
}
