export enum Status {
    Active = 1,
    Inactive =  0 
}
export const StatusArr =
    [
        { id: 1, name: 'Active', nameAr: 'فعال' },
        { id: 2, name: 'Inactive', nameAr: 'غير فعال' },
    ]
export enum GlobalStatus {
    Active = 1,
    Inactive = 2
}
export const GlobalStatusArr =
    [
        { id: 1, name: 'Active', nameAr: 'فعال' },
        { id: 2, name: 'Inactive', nameAr: 'غير فعال' },
    ]
export const orderStatusArr =
    [
        { id: 4, name: 'Not Planned', nameAr: 'غير مخطط' },
        { id: 5, name: 'Awaiting', nameAr: 'بالأنتظار' },
        { id: 6, name: 'In Production', nameAr: 'بالأنتاج' },
        { id: 7, name: 'Held', nameAr: 'معلق' },
        { id: 8, name: 'Completed', nameAr: 'مكتمل' },
        { id: 9, name: 'Closed', nameAr: 'منتهي' },
        { id: 10, name: 'Cancelled', nameAr: 'ملغى' }
    ]

export const productUom =
    [
        { id: 70, titleEn: "Carton", titleAr: "كرتونة", NumValue: 1 },
        { id: 71, titleEn: "Bale", titleAr: "بالة", NumValue: 2 },
        { id: 72, titleEn: "Kg", titleAr: "كغم", NumValue: 3 }
    ]
export enum LookpusType {

    Nationality = 11,
    Currency = 12,
    PreferredLanguage = 13,
    Tax = 14,
    CustomersType = 15,
    unitOfMeasures = 16,
    Category = 17


}
export const LookupsTypeArr =
    [
        { id: 11, name: 'Nationality', nameAr: 'الجنسية', parentId: null },
        { id: 12, name: 'Currency', nameAr: 'العملة', parentId: null },
        { id: 13, name: 'Preferred Language', nameAr: 'الغة المفضلة', parentId: null },
        { id: 14, name: 'Taxes', nameAr: 'ضريبة', parentId: null },
        { id: 15, name: 'Customer Type', nameAr: 'نوع العميل', parentId: null },
        { id: 16, name: 'Unit Of Measure', nameAr: 'وحدة القياس', parentId: null },
        { id: 17, name: 'Category', nameAr: 'الصنف', parentId: null }
    ]
export enum OrderStatus {
    Pending = 1,
    Assigned = 2,
    ArrivedToPickup = 3,
    picked = 4,
    InProgress = 5,
    ArrivedToDestination = 6,
    DroppedOff = 7,
    Delivered = 8,
    canceled = 9
}
export const OrderStatusArr =
    [
        { id: 1, name: 'Pending', nameAr: 'قيد الانتظار' },
        { id: 2, name: 'Assigned', nameAr: 'مُكَلَّف' },
        { id: 3, name: 'Arrived To Pickup', nameAr: 'وصل إلى الاستلام' },
        { id: 4, name: 'Picked', nameAr: 'التقط' },
        { id: 5, name: 'In Progress', nameAr: 'في تَقَدم' },
        { id: 6, name: 'Arrived To Destination', nameAr: 'وصل إلى الوجهة' },
        { id: 7, name: 'Dropped Off', nameAr: 'تم الإنزال' },
        { id: 8, name: 'Delivered', nameAr: 'تم التوصيل' },
        { id: 9, name: 'Canceled', nameAr: 'ألغيت' }
    ];

export enum OrderStatusNewWorkFlow {
    Pending = 1,
    Assigned = 2,
    ArrivedToPickup = 3,
    // picked = 4,
    InProgress = 5,
    ArrivedToDestination = 6,
    // DroppedOff = 7,
    Delivered = 8,
    canceled = 9
}
export const OrderStatusNewWorkFlowArr =
    [
        { id: 1, name: 'Pending', nameAr: 'قيد الانتظار' },
        { id: 2, name: 'Assigned', nameAr: 'تم التعيين' },
        { id: 3, name: 'Picking up', nameAr: 'قيد التحميل' },
        // {id: 4, name: 'Picked', nameAr: 'التقط'},
        { id: 5, name: 'On going', nameAr: 'في الطريق' },
        { id: 6, name: 'Dropping off', nameAr: 'قيد التسليم' },
        // {id: 7, name: 'Dropped Off', nameAr: 'تم الإنزال'},
        { id: 8, name: 'Delivered', nameAr: 'تم التسليم' },
        { id: 9, name: 'Canceled', nameAr: 'ملغي' }
    ];


export enum OrderStatusUpdateStatus {
    Pending = 1,
    Assigned = 2,
    ArrivedToPickup = 3,
    picked = 4,
    // InProgress = 5,
    ArrivedToDestination = 6,
    DroppedOff = 7,
    // Delivered = 8,
    canceled = 9
}
export const OrderStatusUpdateStatusArr =
    [
        { id: 1, name: 'Pending', nameAr: 'قيد الانتظار' },
        { id: 2, name: 'Assigned', nameAr: 'تم التعيين' },
        { id: 3, name: 'Picking up', nameAr: 'قيد التحميل' },
        { id: 4, name: 'On going', nameAr: 'في الطريق' },
        // {id: 5, name: 'On going', nameAr: 'في الطريق'},
        { id: 6, name: 'Dropping off', nameAr: 'قيد التسليم' },
        { id: 7, name: 'Delivered', nameAr: 'تم التسليم' },
        // {id: 8, name: 'Delivered', nameAr: 'تم التسليم'},
        { id: 9, name: 'Canceled', nameAr: 'ملغي' }
    ];

export enum PaymentTypes {
    COD = 1,
    Visa = 2,
    BankTransfer = 3,
}
export const PaymentTypesArr =
    [
        { id: 1, name: 'Cash on delivery', nameAr: 'الدفع عند الاستلام' },
        { id: 2, name: 'Visa', nameAr: 'فيزا' },
        { id: 3, name: 'BankTransfer', nameAr: 'التحويل المصرفي' },
    ]
export enum Measurement {
    Gram = 1,
    Kilo = 2,
    Tone = 3,
    Centimeter = 4,
    Millimeter = 5,
    Meter = 6,
    Kilometer = 7,
    Liter = 8,
    Milliliter = 9
}
export const MeasurementArr =
    [
        { id: 1, nameEn: 'Gram', nameAr: 'جرام' },
        { id: 2, nameEn: 'Kilo', nameAr: 'كيلو' },
        { id: 3, nameEn: 'Tone', nameAr: 'طن' },
        { id: 4, nameEn: 'Centimeter', nameAr: 'سنتيمتر' },
        { id: 5, nameEn: 'Millimeter', nameAr: 'ملليمتر' },
        { id: 6, nameEn: 'Meter', nameAr: 'متر' },
        { id: 7, nameEn: 'Kilometer', nameAr: 'كيلومتر' },
        { id: 8, nameEn: 'Liter', nameAr: 'لتر' },
        { id: 9, nameEn: 'Milliliter', nameAr: 'ملليلتر' }
    ];
export enum InvoiceFrequency {
    OnSpot = 1,
    // Weekly = 2,
    Monthly = 3
}
export const InvoiceFrequencyArr =
    [
        { id: 1, nameEn: 'On Spot', nameAr: 'على الفور' },
        // { id: 2, nameEn: 'Weekly', nameAr: 'إسبوعياً' },
        { id: 3, nameEn: 'Monthly', nameAr: 'شهرياً' },
    ];
export enum InvoiceStatus {
    UnPaid = 1,
    Paid = 2,
    PaymentDue = 3
}
export const InvoiceStatusArr =
    [
        { id: 1, name: 'Un Paid', nameAr: 'غير مدفوع' },
        { id: 2, name: 'Paid', nameAr: 'مدفوع' },
        { id: 3, name: 'Payment Due', nameAr: 'مستحق الدفع' }
    ];
export enum UserPreferredLanguage {
    Arabic = 1,
    English = 2,
}
export const UserPreferredLanguageArr =
    [
        { id: 1, name: 'Arabic', nameAr: 'عربي' },
        { id: 2, name: 'English', nameAr: 'إنجليزي' }
    ];
export enum UserType {
    Admin = 1,
    Shipper = 2,
    Carrier = 3,
}
export const UserTypeArr =
    [
        { id: 1, name: 'Admin', nameAr: 'الأدمن' },
        { id: 2, name: 'Shipper', nameAr: 'الشاحن' },
        { id: 3, name: 'Carrier', nameAr: 'الناقل' }
    ];
export enum Language {
    EN = 'en',
    AR = 'ar'
}
export const onlyCountries =
    [
        'af', 'al', 'dz', 'ad', 'ao', 'ai', 'ag', 'ar', 'am', 'aw', 'au', 'at', 'az',
        'bs', 'bh', 'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bm', 'bt', 'bo', 'ba', 'bw', 'br',
        'bn', 'bg', 'bf', 'bi', 'kh', 'cm', 'ca', 'cv', 'ky', 'cf', 'td', 'cl', 'cn', 'co',
        'km', 'cr', 'hr', 'cu', 'cy', 'cz', 'cd', 'dk', 'dj', 'dm', 'do', 'tl', 'ec', 'eg',
        'sv', 'gq', 'er', 'ee', 'sz', 'et', 'fj', 'fi', 'fr', 'ga', 'gm', 'ge', 'de', 'gh',
        'gr', 'gl', 'gd', 'gu', 'gt', 'gn', 'gw', 'gy', 'ht', 'hn', 'hk', 'hu', 'is', 'in',
        'id', 'iq', 'ie', 'it', 'jm', 'jp', 'jo', 'kz', 'ke', 'ki', 'kw', 'kg', 'la', 'lv',
        'lb', 'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mo', 'mg', 'mw', 'my', 'mv', 'ml', 'mt',
        'mh', 'mr', 'mu', 'mx', 'fm', 'md', 'mc', 'mn', 'me', 'ms', 'ma', 'mz', 'mm', 'na',
        'nr', 'np', 'nl', 'nz', 'ni', 'ne', 'ng', 'kp', 'mk', 'no', 'om', 'pk', 'pw', 'pa',
        'pg', 'py', 'pe', 'ph', 'pl', 'pt', 'pr', 'qa', 'cg', 'ro', 'ru', 'rw', 'kn', 'lc',
        'vc', 'ws', 'sm', 'st', 'sa', 'sn', 'rs', 'sc', 'sl', 'sg', 'sk', 'si', 'sb', 'so',
        'za', 'kr', 'ss', 'es', 'lk', 'sd', 'sr', 'se', 'ch', 'sy', 'tw', 'tj', 'tz', 'th',
        'tg', 'to', 'tt', 'tn', 'tr', 'tm', 'tv', 'ug', 'ua', 'ae', 'gb', 'us', 'uy', 'uz',
        'vu', 'va', 've', 'vn', 'ye', 'zm', 'zw'
    ];

export const approvalStatuses =
    [
        { id: 1, name: 'Approved', nameAr: 'تمت الموافقة' },
        { id: 2, name: 'Rejected', nameAr: 'تم الرفض' },
    ];


export enum ClientType {
    Customer = 1,
    Supplier = 2
}