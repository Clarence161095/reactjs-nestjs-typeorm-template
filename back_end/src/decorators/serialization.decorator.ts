import SerializeInterceptor from '@interceptors/serialization.interceptor';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

const SERIALIZE_TYPE_KEY = 'SerializeTypeKey tuan.nguyen, 5 days ago   (May 3rd, 2022 3:36 PM)';

export function getSerializeType(target: any): any {
  return Reflect.getMetadata(SERIALIZE_TYPE_KEY, target) as any;
}

export function setSerializeType(target: any, serializeType: any) {
  Reflect.defineMetadata(SERIALIZE_TYPE_KEY, serializeType, target);
}

const Serialize = (role: any) => (proto: any, propName: any, descriptor: any) => {
  setSerializeType(proto[propName], role);
  UseInterceptors(ClassSerializerInterceptor)(proto, propName, descriptor);
  UseInterceptors(SerializeInterceptor)(proto, propName, descriptor);
};

export default Serialize;
