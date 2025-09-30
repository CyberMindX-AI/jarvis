import React from 'react';
import { useConversation } from '@elevenlabs/react';
import { Button } from '@/components/ui/button';

interface JarvisInterfaceProps {
  agentId?: string;
  apiKey?: string;
}

export const JarvisInterface: React.FC<JarvisInterfaceProps> = ({ agentId, apiKey }) => {
  const conversation = useConversation({
    onConnect: () => {
      console.log('Jarvis: Connection established');
    },
    onDisconnect: () => {
      console.log('Jarvis: Connection terminated');
    },
    onMessage: (message) => {
      console.log('Jarvis message:', message);
    },
    onError: (error) => {
      console.error('Jarvis error:', error);
    },
  });

  const { status, isSpeaking } = conversation;
  const isConnected = status === 'connected';

  const handleActivate = async () => {
    if (!agentId || !apiKey) {
      alert('Please provide Agent ID and API Key first');
      return;
    }

    try {
      if (isConnected) {
        await conversation.endSession();
      } else {
        // Request microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Start session directly with agent ID (for public agents)
        await conversation.startSession({ 
          agentId,
          connectionType: 'webrtc'
        });
      }
    } catch (error) {
      console.error('Error toggling conversation:', error);
      alert('Failed to start conversation. Please check your agent ID and ensure microphone access is granted.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Jarvis Interface */}
      <div className="relative z-10">
        {/* Outer Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outermost Ring */}
          <div className={`w-96 h-96 rounded-full border-2 border-jarvis-blue/30 animate-jarvis-rotate ${isConnected ? 'animate-jarvis-glow' : ''}`} />
          
          {/* Second Ring */}
          <div className={`absolute w-80 h-80 rounded-full border border-jarvis-blue/40 animate-jarvis-pulse ${isSpeaking ? 'animate-ring-expand' : ''}`} />
          
          {/* Third Ring */}
          <div className="absolute w-64 h-64 rounded-full border border-jarvis-blue/50" />
          
          {/* Inner Ring */}
          <div className={`absolute w-48 h-48 rounded-full border-2 border-jarvis-pulse/60 ${isSpeaking ? 'animate-jarvis-pulse' : ''}`} />
        </div>

        {/* Center Hub */}
        <div className="relative z-20 flex items-center justify-center">
          {/* Central Button (Hidden in Interface) */}
          <Button
            onClick={handleActivate}
            className={`w-32 h-32 rounded-full bg-gradient-to-r from-jarvis-blue to-jarvis-pulse 
              border-2 border-jarvis-blue/60 shadow-[0_0_30px_hsl(var(--jarvis-blue)/0.5)]
              hover:shadow-[0_0_50px_hsl(var(--jarvis-pulse)/0.8)]
              transition-all duration-300 group relative overflow-hidden
              ${isConnected ? 'animate-jarvis-glow' : ''}
              ${isSpeaking ? 'animate-jarvis-pulse' : ''}`}
            variant="ghost"
          >
            {/* Button Content - Minimal Jarvis Design */}
            <div className="relative z-10 flex flex-col items-center justify-center text-primary-foreground">
              {/* Central Dot */}
              <div className={`w-3 h-3 rounded-full bg-current mb-2 ${isSpeaking ? 'animate-waveform' : ''}`} />
              
              {/* Status Indicator */}
              <div className="text-xs font-mono uppercase tracking-wider">
                {!isConnected ? 'ACTIVATE' : isSpeaking ? 'LISTENING' : 'ACTIVE'}
              </div>
            </div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-jarvis-pulse/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </Button>
        </div>

        {/* Audio Waveform Indicators */}
        {isSpeaking && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 bg-jarvis-pulse rounded-full animate-waveform`}
                style={{
                  height: `${20 + Math.random() * 40}px`,
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Status Display */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-jarvis-blue font-mono text-sm uppercase tracking-widest mb-2">
            J.A.R.V.I.S
          </div>
          <div className="text-jarvis-pulse/60 font-mono text-xs">
            {!agentId || !apiKey
              ? 'AWAITING AGENT CONFIGURATION' 
              : !isConnected 
              ? 'SYSTEM STANDBY' 
              : isSpeaking 
              ? 'PROCESSING AUDIO INPUT'
              : 'READY FOR COMMANDS'
            }
          </div>
        </div>

        {/* Connection Status Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isConnected 
                  ? i < 4 ? 'bg-jarvis-blue animate-jarvis-pulse' : 'bg-jarvis-pulse animate-jarvis-pulse'
                  : 'bg-jarvis-blue/30'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Corner UI Elements */}
      <div className="absolute top-4 right-4 text-right">
        <div className="text-jarvis-blue/60 font-mono text-xs">
          STARK INDUSTRIES
        </div>
        <div className="text-jarvis-pulse/40 font-mono text-xs">
          AI ASSISTANT v3.0
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="text-jarvis-blue/60 font-mono text-xs">
          STATUS: {isConnected ? 'ONLINE' : 'OFFLINE'}
        </div>
        <div className="text-jarvis-pulse/40 font-mono text-xs">
          VOICE: {isSpeaking ? 'ACTIVE' : 'IDLE'}
        </div>
      </div>
    </div>
  );
};