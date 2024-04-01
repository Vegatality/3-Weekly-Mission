import { ComponentProps, ComponentType, MutableRefObject, PropsWithChildren } from 'react';

// TODO: Modal -> ModalList 이사 🚗

export type Obj = {
  [key: string]: any;
};
type Key = keyof Obj;

type ModalComponentOrObj = ModalComponentSuperSet | Obj;
type ModalComponentOrObjForList = ModalComponentForListSuperSet | Obj;

export type RemappedOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

export type SetPickedPropToRequired<T extends Obj, K extends keyof T> = RemappedOmit<T, K> & Required<Pick<T, K>>;

export type ModalNode = HTMLElement | null;

export type ValidModalProps = ModalHandler & Obj;

export type ValidModalPropsForList = ModalHandlerForList & Obj;

export interface OpenModalListOptions {
  persist?: boolean | ModalKey;
}

export interface OpenModalOptions extends OpenModalListOptions {
  persist?: boolean;
}

export interface OptionalModalListProps {
  closeModal?: () => void;
  submitModal?: (e?: React.BaseSyntheticEvent) => void;
  modalRef: CustomModalRef;
  isCurrentModalOpen: boolean;
}

export interface OptionalModalProps extends Omit<OptionalModalListProps, 'modalRef'> {
  modalRef?: MutableRefObject<ModalNode> | null;
}

export type RequiredModalProps = Required<OptionalModalProps>;
type HasCloseModal = SetPickedPropToRequired<OptionalModalProps, 'closeModal'>;
type HasModalRef = SetPickedPropToRequired<OptionalModalProps, 'modalRef'>;
type HasSubmitModal = SetPickedPropToRequired<OptionalModalProps, 'submitModal'>;

export type RequiredModalPropsForList = Required<OptionalModalListProps>;
type HasCloseModalForList = SetPickedPropToRequired<OptionalModalListProps, 'closeModal'>;
type HasModalRefForList = SetPickedPropToRequired<OptionalModalListProps, 'modalRef'>;
type HasSubmitModalForList = SetPickedPropToRequired<OptionalModalListProps, 'submitModal'>;

export interface ModalHandler {
  onClose?: () => void;
  onOpen?: () => void;
  onSubmit?: () => void;
  modalRef?: MutableRefObject<ModalNode> | null;
}

export interface ModalHandlerForList extends Omit<ModalHandler, 'modalRef'> {
  modalRef: CustomModalRef;
}

/**
 * base modalcomponent type
 *
 * @example
 * ```tsx
 * const MyModal: ModalComponent<{ userName: string; }> = ({ closeModal, modalRef, submitModal, userName }) => {
 *  return (
 *     <div ref={(node) => {
 *         if (modalRef) modalRef.current = node;
 *       }}>
 *        <h1>{userName}</h1>
 *       <button onClick={closeModal}>close</button>
 *       <button onClick={submitModal}>submit</button>
 *     </div>
 *  );
 * };
 * ```
 */
export type ModalComponent<CustomComponentProps = unknown> = ComponentType<CustomComponentProps & RequiredModalProps>;

/**
 * base ModalComponentForList type
 *
 * @example
 * ```tsx
 * const MyModal: ModalComponentForList<{ userName: string; }> = ({ closeModal, modalRef, submitModal, userName }) => {
 *  return (
 *     <div ref={modalRef}>
 *        <h1>{userName}</h1>
 *       <button onClick={closeModal}>close</button>
 *       <button onClick={submitModal}>submit</button>
 *     </div>
 *  );
 * };
 * ```
 */
export type ModalComponentForList<CustomComponentProps = unknown> = ComponentType<
  CustomComponentProps & RequiredModalPropsForList
>;

export type ModalComponentSuperSet = ModalComponent<any>;

export type ModalComponentForListSuperSet = ModalComponentForList<any>;

/**
 * modalcomponent props
 *
 * @example
 * ```tsx
 * const MyModal = ({ closeModal, modalRef, submitModal, userName }: ModalComponentProps<{ userName: string; }>) => {
 *   return (
 *     <div ref={ref={(node) => {
 *         if (modalRef) modalRef.current = node;
 *       }}>
 *       <h1>{userName}</h1>
 *       <button onClick={closeModal}>close</button>
 *       <button onClick={submitModal}>submit</button>
 *     </div>
 *  );
 * };
 * ```
 */
export type ModalComponentProps<CustomComponentProps = unknown> = ComponentProps<ModalComponent<CustomComponentProps>>;

/**
 * ModalComponentPropsForList props
 *
 * @example
 * ```tsx
 * const MyModal = ({ closeModal, modalRef, submitModal, userName }: ModalComponentPropsForList<{ userName: string; }>) => {
 *   return (
 *     <div ref={modalRef}>
 *       <h1>{userName}</h1>
 *       <button onClick={closeModal}>close</button>
 *       <button onClick={submitModal}>submit</button>
 *     </div>
 *  );
 * };
 * ```
 */
export type ModalComponentPropsForList<CustomComponentProps = unknown> = ComponentProps<
  ModalComponentForList<CustomComponentProps>
>;

type InternalModalComponentProps<T extends ModalComponentSuperSet> =
  T extends ModalComponent<infer R> ? R & ModalHandler : ModalHandler;

type InternalModalListComponentProps<T extends ModalComponentForListSuperSet> =
  T extends ModalComponentForList<infer R> ? R & ModalHandlerForList : ModalHandlerForList;

/**
 * * 함수의 인자 검증 부분에서 사용
 * * ModalComponent는 OptionalModalProp중 closeModal prop이 필수로 있어야 한다.
 */
export type ModalComponentHasCloseModal<T extends ModalComponent> = ComponentProps<T> extends HasCloseModal ? T : never;

export type ModalComponentHasCloseModalForList<T extends ModalComponentForList> =
  ComponentProps<T> extends HasCloseModalForList ? T : never;

/**
 * for component validation (whether has modalRef)
 */
export type ModalComponentHasModalRef<T extends ModalComponent> = ComponentProps<T> extends HasModalRef ? T : never;

export type ModalComponentHasModalRefForList<T extends ModalComponentForList> =
  ComponentProps<T> extends HasModalRefForList ? T : never;

/**
 * for component validation (whether has submitModal)
 */
export type ModalComponentHasSubmitModal<T extends ModalComponent> =
  ComponentProps<T> extends HasSubmitModal ? T : never;

export type ModalComponentHasSubmitModalForList<T extends ModalComponentForList> =
  ComponentProps<T> extends HasSubmitModalForList ? T : never;

/**
 * * 함수의 인자 검증 부분에서 사용
 * * ModalComponent는 모든 OptionalModalProp이 필수로 있어야 한다.
 */
export type ModalComponentHasAllRequiredProps<T extends ModalComponent> =
  ComponentProps<T> extends RequiredModalProps ? T : never;

export type ModalComponentHasAllRequiredPropsForList<T extends ModalComponentForList> =
  ComponentProps<T> extends RequiredModalPropsForList ? T : never;

export type Without<T extends ModalComponentOrObj, K extends Key> = T extends ModalComponentSuperSet
  ? Omit<InternalModalComponentProps<T>, K>
  : T extends Obj
    ? Omit<T, K>
    : never;

export type WithoutForList<
  T extends ModalComponentOrObjForList,
  K extends Key,
> = T extends ModalComponentForListSuperSet
  ? Omit<InternalModalListComponentProps<T>, K>
  : T extends Obj
    ? Omit<T, K>
    : never;

// TODO: Union type would be more simple than multiple Without types
type ModalComponentPropsWithoutModalRef<T extends ModalComponentOrObj> = Without<T, 'modalRef'>;
type ModalComponentPropsWithoutCloseModal<T extends ModalComponentOrObj> = Without<T, 'closeModal'>;
type ModalComponentPropsWithoutSubmitModal<T extends ModalComponentOrObj> = Without<T, 'submitModal'>;
type ModalComponentPropsForListWitout<T extends ModalComponentOrObjForList, K extends Key> = WithoutForList<T, K>;

export type ExposedModalProps<T extends ModalComponentSuperSet> = ModalComponentPropsWithoutSubmitModal<
  ModalComponentPropsWithoutCloseModal<T>
> &
  ModalHandler;

export type ExposedModalPropsWithoutModalRef<T extends ModalComponentSuperSet> = ModalComponentPropsWithoutModalRef<
  ExposedModalProps<T>
> &
  Omit<ModalHandler, 'modalRef'>;

export type ExposedModalPropsForList<T extends ModalComponentForListSuperSet> = ModalComponentPropsForListWitout<
  T,
  'modalRef' | 'closeModal' | 'submitModal' | 'isCurrentModalOpen'
> &
  Omit<ModalHandlerForList, 'modalRef'>;

/// ////////////////////////////////////////////////////////////////////////////////////
/// for multi layer modals
/// ////////////////////////////////////////////////////////////////////////////////////

export type ModalKey = readonly string[];

export type StringifiedModalKey = string;

export interface OpenedModalStateWithModalKey {
  modalKey: StringifiedModalKey;
  ModalComponent: ModalComponentForList;
  props: ValidModalPropsForList;
}

type ManagedModalInfo = {
  ModalComponent: ModalComponentForList;
  modalNode?: ModalNode;
  options?: OpenModalListOptions;
};

export type ModalInfoManageMap = Map<StringifiedModalKey, ManagedModalInfo>;

/**
 * TODO: `current` property should be typed with both getter and setter
 */
export interface CustomModalRef {
  <T extends ModalNode>(node: T): void;
  current: ReturnType<Watch>;
}

export type SetCustomModalRef = ({
  modalKey,
  ModalComponent,
  options,
}: {
  modalKey: StringifiedModalKey;
  ModalComponent: ModalComponentForList;
  options?: OpenModalListOptions;
}) => CustomModalRef;

export type OpenWithModalKeyImpl = <VMC extends ModalComponentForList>({
  modalKey,
  ModalComponent,
  props,
  options,
}: {
  modalKey: ModalKey;
  ModalComponent: VMC;
  props?: ExposedModalPropsForList<VMC> | null;
  options?: OpenModalListOptions;
}) => void;

export type CloseWithModalKey = ({ modalKey }: { modalKey: ModalKey }) => void;

export type CloseWithModalKeyImpl = ({ modalKey }: { modalKey: ModalKey | StringifiedModalKey }) => void;

export type Watch = (modalKey: ModalKey) => ManagedModalInfo | undefined;

export interface IModalListDispatchContext {
  openWithModalKeyImpl: OpenWithModalKeyImpl;
  closeWithModalKeyImpl: CloseWithModalKeyImpl;
  watch: Watch;
}

export type TModalListStateContext = Array<{
  modalKey: StringifiedModalKey;
  ModalComponent: ModalComponentForList;
  props: ValidModalPropsForList;
}>;

export type OpenModalListWithModalKey = <VMC extends ModalComponentForListSuperSet>({
  modalKey,
  ModalComponent,
  props,
  options,
}: {
  modalKey: ModalKey;
  ModalComponent: VMC;
  props?: ExposedModalPropsForList<VMC> | null;
  options?: OpenModalListOptions;
}) => void;

export type UseModalList = () => {
  openModalList: OpenModalListWithModalKey;
  closeModalList: CloseWithModalKey;
  watch: Watch;
};

/// ////////////////////////////////////////////////////////////////////////////////////
/// for single layer modal
/// ////////////////////////////////////////////////////////////////////////////////////

export type TModalStateContext = {
  ModalComponent: ModalComponent | null;
  props: ValidModalProps;
  isModalOpen: boolean;
};

export type TModalDispatchContext = {
  open: <VMC extends ModalComponent>({
    ModalComponent,
    props,
    options,
  }: {
    ModalComponent: VMC;
    props?: ExposedModalPropsWithoutModalRef<VMC> | null;
    options?: OpenModalOptions;
  }) => void;
  close: VoidFunction;
};

export type OpenModal = <MC extends ModalComponentSuperSet, VMC extends ModalComponentHasAllRequiredProps<MC>>({
  Component,
  props,
  options,
}: {
  Component: VMC;
  props: ExposedModalPropsWithoutModalRef<VMC> | null;
  options?: OpenModalOptions;
}) => void;

export type UseModal = () => {
  openModal: OpenModal;
  closeModal: VoidFunction;
  isModalOpen: boolean;
};

export type ModalProviderProps = PropsWithChildren;

export type ModalListProviderProps = PropsWithChildren;
