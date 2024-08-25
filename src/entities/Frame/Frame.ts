export type FrameProps = {
  id: string;
  html: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  demoId: string;
};

/**
 * @name Frame
 * @description
 * This class represents a frame of the application.
 *
 */

export class Frame {
  get id() {
    return this.props.id.toString();
  }

  get html() {
    return this.props.html;
  }

  get order() {
    return this.props.order;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get demoId() {
    return this.props.demoId;
  }

  constructor(readonly props: FrameProps) {}
}
