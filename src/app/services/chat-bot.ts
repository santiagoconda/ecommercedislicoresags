import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
export interface Message{
  role:'user' | 'assistant';
  content: string;
  timestamp:Date;
}
@Injectable({
  providedIn: 'root',
})
export class ChatBot {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

    private conversationHistory: Array<{role: string, content: string}> = [];
  // Información de tu tienda para el contexto del chatbot
  private storeContext = `
Eres un asistente virtual experto de DISLICORESAGS, una tienda de licores Nacionales en Jambalo Cauca Colombia.

INFORMACIÓN DE LA TIENDA:
- Nombre: DISLICORESAGS
- Productos: Whisky, Ron, Vodka, Aguardiente, Hidratantes, Gaseosas; Agua
- Zonas de envío: En todo el municipio de Jambalo, Cauca Colombia
- Tiempo de entrega: 24-48 horas
- Métodos de pago: Efectivo, tarjeta, transferencia, Nequi, Daviplata, Entregamos  credito
- Edad mínima: Solo vendemos a mayores de 18 años

PRODUCTOS DESTACADOS:
Whisky:
- Buchanan's 12 años - $165.000

Ron:
- Viejo de Caldas Tradicional 375ml - Unidad $28.000
- Viejo de Caldas Tradicional 750ml - unidad $54.834
- Licor de ron Viejo de Caldaas Esencial 375ml - unidad $22.350
- Licor de ron Viejo de Caldaas Esencial 750ml - unidad $42.835

Vodka:
- Smirnoff - unidad $55000.000



Tequila:
- Don Julio Reposado - unidad $185.000

Aguardiente:
- Aguardiente Amarillo de Manzanares Sa 750ml - unidad $48.599


POLÍTICAS:
- Entregas gratis en compras superiores a $200.000
- Devoluciones dentro de 24 horas si el producto está sellado
- Garantía de autenticidad en todos los productos
- Horario de atención: Lunes a Sábado 9am - 8pm, Domingos 10am - 6pm

TU COMPORTAMIENTO:
- Sé amigable, profesional y conocedor
- Recomienda productos basándote en las preferencias del cliente
- Sugiere alternativas si no tenemos algo específico
- Menciona promociones cuando sea relevante
- Si preguntan por el carrito o hacer pedido, indícales usar el botón de carrito o WhatsApp
- No inventes precios o productos que no están en la lista
- Sé conciso pero informativo
`;
  constructor(private http: HttpClient) {
    // Mensaje de bienvenida inicial
    this.addMessage({
      role: 'assistant',
      content: '¡Hola! 👋 Soy el asistente virtual de DISLICORESAGS. ¿En qué puedo ayudarte hoy? Puedo recomendarte productos, resolver dudas sobre envíos, pagos o lo que necesites. 🥃',
      timestamp: new Date()
    });
  }
async sendMessage(userMessage: string): Promise<void> {
  // Agregar mensaje del usuario
  this.addMessage({
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  });

  this.conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  try {
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        conversation_history: this.conversationHistory.slice(0, -1)
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data recibida:', data);
    
    // Laravel devuelve { reply: "..." }
    if (data.reply) {
      // Agregar respuesta del asistente
      this.addMessage({
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      });

      // Agregar al historial
      this.conversationHistory.push({
        role: 'assistant',
        content: data.reply
      });
    } else {
      console.error('No hay reply en la respuesta:', data);
      throw new Error('Respuesta inválida del servidor');
    }
  } catch (error) {
    console.error('Error al comunicarse con Claude:', error);
    this.addMessage({
      role: 'assistant',
      content: 'Lo siento, hubo un problema al procesar tu mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp.',
      timestamp: new Date()
    });
  }
}

  private addMessage(message: Message): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  clearChat(): void {
    this.messagesSubject.next([{
      role: 'assistant',
      content: '¡Hola! 👋 Soy el asistente virtual de DISLICORESAGS. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }]);
    this.conversationHistory = [];
  }

  getMessages(): Message[] {
    return this.messagesSubject.value;
  }
}

  

