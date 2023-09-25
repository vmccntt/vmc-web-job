export enum MODULE_ENUM {
    POST = 'post',
    BANNER = 'banner',
    CATEGORY = 'category',
    // PRODUCT = 'product',
    RECRUIMENT = 'recruiment',
    PARTNER = 'partner',
    CERTIFICATE = 'certificate',
    CONTACT = 'contact',
    INFOR_CONTACT = 'inforContact',
    LANGUAGE = 'language',
    USER = 'user',
    ROLE = 'role',
}

export const LABLE_MODULE_ENUM: any = {
    'post' : 'Bài viết',
    'banner' : 'Trình chiếu',
    'category' : 'Danh mục',
    'recruiment' : 'Tuyển dụng',
    'partner' : 'Đối tác',
    'certificate' : 'Chứng chỉ',
    'contact' : 'Thông tin',
    'inforContact' : 'Địa chỉ',
    'language' : 'Ngôn ngữ',
    'user' : 'Người dùng',
    'role' : 'Phân quyền',
}
export const ModulePermisson = Object.keys(LABLE_MODULE_ENUM);

export enum PERMISSION_ENUM {
    POST_LIST=`post.list`,
    POST_CREATE=`post.create`,
    POST_UPDATE=`post.update`,
    POST_DELETE=`post.delete`,
    POST_ISPUBLISH=`post.isPublish`,
    
    PARTNER_LIST=`partner.list`,
    PARTNER_CREATE=`partner.create`,
    PARTNER_UPDATE=`partner.update`,
    PARTNER_DELETE=`partner.delete`,
    PARTNER_ISPUBLISH=`partner.isPublish`,
    
    USER_LIST=`user.list`,
    USER_CREATE=`user.create`,
    USER_UPDATE=`user.update`,
    USER_DELETE=`user.delete`,
    USER_ISPUBLISH=`user.isPublish`,
    
    LANGUAGE_LIST=`language.list`,
    LANGUAGE_CREATE=`language.create`,
    LANGUAGE_UPDATE=`language.update`,
    LANGUAGE_DELETE=`language.delete`,
    
    INFOR_CONTACT_LIST=`inforContact.list`,
    INFOR_CONTACT_CREATE=`inforContact.create`,
    INFOR_CONTACT_UPDATE=`inforContact.update`,
    INFOR_CONTACT_DELETE=`inforContact.delete`,
    
    CONTACT_LIST=`contact.list`,
    CONTACT_CREATE=`contact.create`,
    CONTACT_UPDATE=`contact.update`,
    CONTACT_DELETE=`contact.delete`,
    
    CERTIFICATE_CREATE=`certificate.create`,
    CERTIFICATE_UPDATE=`certificate.update`,
    CERTIFICATE_DELETE=`certificate.delete`,
    CERTIFICATE_LIST=`certificate.list`,
    
    BANNER_LIST=`banner.list`,
    BANNER_CREATE=`banner.create`,
    BANNER_UPDATE=`banner.update`,
    BANNER_DELETE=`banner.delete`,
    
    CATEGORY_LIST=`category.list`,
    CATEGORY_CREATE=`category.create`,
    CATEGORY_UPDATE=`category.update`,
    CATEGORY_DELETE=`category.delete`,
    
    ROLE_LIST=`role.list`,
    ROLE_CREATE=`role.create`,
    ROLE_UPDATE=`role.update`,
    ROLE_DELETE=`role.delete`,
    
    RECRUIMENT_LIST=`recruiment.list`,
    RECRUIMENT_CREATE=`recruiment.create`,
    RECRUIMENT_UPDATE=`recruiment.update`,
    RECRUIMENT_DELETE=`recruiment.delete`,
}