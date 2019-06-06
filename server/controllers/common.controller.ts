import { Request, Response } from 'express';
import { image } from 'qr-image';
import { IpService } from '../services/ip.service';

export class CommonController {
  ipService: IpService;

  constructor() {
    this.ipService = new IpService();
  }

  qr(req: Request, res: Response) {
    const url: string = `http://${this.ipService.getIPAddress()}:3000`;

    const qr_svg: NodeJS.ReadableStream = image(url, {
      type: 'png',
      size: 10,
    });

    qr_svg.pipe(res);
  };

  shareUrl(req: Request, res: Response) {
    return res.json({
      url: `http://${this.ipService.getIPAddress()}:3000`,
    });
  };

};
